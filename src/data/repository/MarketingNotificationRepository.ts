import Logger from "../../util/Logger";
import {autoInjectable} from "tsyringe";
import MarketingNotification from "../../dto/marketing_notification/MarketingNotification";
import {NotFoundError} from "../../errors/ApiError";
import UserEntity from "../models/entity/UserEntity";
import ResponseMessages from "../../util/statics/ResponseMessages";
import AppUtils from "../../util/AppUtils";
import {instanceToPlain, plainToInstance} from "class-transformer";
import MarketingNotificationUserMappingEntity from "../models/entity/MarketingNotificationUserMappingEntity";
import MarketingNotificationEntity from "../models/entity/MarketingNotificationEntity";
import MarketingNotificationUser from "../../dto/marketing_notification_user/MarketingNotificationUser";
import {InternalErrorResponse} from "../../util/ApiResponse";

@autoInjectable()
export default class MarketingNotificationRepository {

    constructor() {
        Logger.debug("Initialising Marketing Notification repository");
    }

    //Fetch Queries

    //Create Query
    public async addMarketingNotification(marketingNotification: MarketingNotification, userId: string): Promise<MarketingNotification> {
        let marketingNotificationEntity: MarketingNotificationEntity;
        let userEntity = await UserEntity.findByPk(userId);

        if (userEntity == null) {
            throw new NotFoundError(ResponseMessages.USER_WITH_ID_NOT_FOUND + userId);
        }

        marketingNotificationEntity = await userEntity.createMarketingNotification(AppUtils.nullPropsRemover(instanceToPlain(marketingNotification)));

        let usersToBeAdded: MarketingNotificationUser[] = marketingNotification.users.map(user => new MarketingNotificationUser(user.userId, marketingNotificationEntity.id));
        let addedUsers: MarketingNotificationUserMappingEntity[] = await MarketingNotificationUserMappingEntity.bulkCreate(AppUtils.nullPropsRemover(instanceToPlain(usersToBeAdded)));

        marketingNotification = plainToInstance(MarketingNotification, marketingNotificationEntity.get({plain: true}), {excludeExtraneousValues: true});
        marketingNotification.users = plainToInstance(MarketingNotificationUser, addedUsers, {excludeExtraneousValues: true});

        return marketingNotification;

    }

    //Update Query
    public async updateMarketingNotification(marketingNotification: MarketingNotification, marketingNotificationId: string, userId: string): Promise<MarketingNotification> {
        let marketingNotificationEntity: MarketingNotificationEntity | null;
        let userEntity = await UserEntity.findByPk(userId);

        if (userEntity == null) {
            throw new NotFoundError(ResponseMessages.USER_WITH_ID_NOT_FOUND + userId);
        }

        if (marketingNotification.users == null || marketingNotification.users.length == 0) {
            marketingNotificationEntity = await MarketingNotificationEntity.findByPk(marketingNotificationId);
        } else {
            marketingNotificationEntity = await MarketingNotificationEntity.findByPk(marketingNotificationId, {
                include: [{
                    model: MarketingNotificationUserMappingEntity,
                    as: 'users'
                }]
            });
        }

        Logger.debug("Fetched success");
        Logger.debug(marketingNotificationEntity?.users);

        if (marketingNotificationEntity == null) {
            throw new NotFoundError(ResponseMessages.MARKETING_NOTIFICATION_NOT_FOUND + marketingNotificationId);
        }


        if (marketingNotificationEntity.users != null && marketingNotification.users != null) {
            let usersAvailable: string[] = marketingNotificationEntity.users.map(user => user.userId);
            let usersInput: string[] = marketingNotification.users.map(user => user.userId);
            let userUnion: string[] = [...new Set([...usersAvailable, ...usersInput])];
            let userToBeAdded: string[] = userUnion.filter(item => usersAvailable.indexOf(item) < 0);
            let userToBeRemoved: string[] = userUnion.filter(item => usersInput.indexOf(item) < 0);

            await MarketingNotificationUserMappingEntity.destroy(
                {where: {user_id: userToBeRemoved, marketing_notification_id: marketingNotificationEntity.id}}
            );

            await MarketingNotificationUserMappingEntity.bulkCreate(
                AppUtils.nullPropsRemover(
                    instanceToPlain(
                        userToBeAdded.map(
                            userIdToBeMapped => new MarketingNotificationUser(userIdToBeMapped, marketingNotificationId)
                        )
                    )
                )
            );
        }

        marketingNotificationEntity.set(AppUtils.nullPropsRemover(instanceToPlain(marketingNotification)));
        marketingNotificationEntity = await marketingNotificationEntity.save();

        marketingNotification = plainToInstance(MarketingNotification, marketingNotificationEntity, {excludeExtraneousValues: true});
        marketingNotification.users = plainToInstance(MarketingNotificationUser, await marketingNotificationEntity.getUsers(), {excludeExtraneousValues: true});

        return marketingNotification;
    }

    //Delete Query


    public async deleteMarketingNotification(id: string, userId: string): Promise<void> {
        try {
            let result: [affectedCount: number] = await MarketingNotificationEntity.update({active: false}, {
                where: {
                    id: id,
                    user_id: userId,
                    active: true
                }
            });
            if (!result[0]) {
                throw new NotFoundError(ResponseMessages.MARKETING_NOTIFICATION_NOT_REGISTERED);
            }
        } catch (e: any) {
            if (e instanceof NotFoundError) {
                throw e;
            }
            Logger.error("Error while deleting business profile");
            throw new InternalErrorResponse();
        }
    }

    public async getAllMarketingNotifications(userId: string): Promise<MarketingNotification[]> {
        let marketingNotificationList: MarketingNotificationEntity[] | null = await MarketingNotificationEntity.findAll({
            where: {
                user_id: userId,
                active: true
            },
            include: [{
                model: MarketingNotificationUserMappingEntity,
                as: 'users'
            }]
        });

        if (marketingNotificationList == null) {
            throw new NotFoundError(ResponseMessages.MARKETING_NOTIFICATION_NOT_REGISTERED);
        }

        return marketingNotificationList.map(marketingNotification => plainToInstance(MarketingNotification, marketingNotification.get({plain: true}), {excludeExtraneousValues: true}));
    }

    public async getMarketingNotification(id: string, userId: string): Promise<MarketingNotification> {
        let marketingNotificationEntity: MarketingNotificationEntity | null = await MarketingNotificationEntity.findByPk(id, {
            include: [{
                model: MarketingNotificationUserMappingEntity,
                as: 'users'
            }]
        });

        if (marketingNotificationEntity == null || marketingNotificationEntity.userId != userId) {
            throw new NotFoundError(ResponseMessages.PRODUCTS_NOT_FOUND + id);
        }

        return plainToInstance(MarketingNotification, marketingNotificationEntity.get({plain: true}), {excludeExtraneousValues: true});
    }

    public async getMarketingNotificationUserIds(id: string, userId: string): Promise<string[]> {
        let userIds: string[];
        let marketingNotificationEntity: MarketingNotificationEntity | null = await MarketingNotificationEntity.findByPk(id, {
            attributes: ['id', 'userId'],
            include: [{
                model: MarketingNotificationUserMappingEntity,
                as: 'users'
            }]
        });

        if (marketingNotificationEntity == null || marketingNotificationEntity.userId != userId) {
            throw new NotFoundError(ResponseMessages.MARKETING_NOTIFICATION_NOT_FOUND + id);
        }

        if(marketingNotificationEntity.users == undefined || marketingNotificationEntity.users.length ==0) {
            return [];
        }

        return marketingNotificationEntity.users.map(user => user.userId);
    }
}
