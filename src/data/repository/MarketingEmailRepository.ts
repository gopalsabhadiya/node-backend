import Logger from "../../util/Logger";
import {autoInjectable} from "tsyringe";
import {NotFoundError} from "../../errors/ApiError";
import MarketingEmail from "../../dto/marketing_email/MarketingEmail";
import MarketingEmailUser from "../../dto/marketing_email_user/MarketingEmailUser";
import UserEntity from "../models/entity/UserEntity";
import ResponseMessages from "../../util/statics/ResponseMessages";
import AppUtils from "../../util/AppUtils";
import {instanceToPlain, plainToInstance} from "class-transformer";
import MarketingEmailEntity from "../models/entity/MarketingEmailEntity";
import MarketingEmailUserMappingEntity from "../models/entity/MarketingEmailUserMappingEntity";
import {InternalErrorResponse} from "../../util/ApiResponse";

@autoInjectable()
export default class MarketingEmailRepository {

    constructor() {
        Logger.debug("Initialising Marketing Email repository");
    }

    public async addMarketingEmail(marketingEmail: MarketingEmail, userId: string): Promise<MarketingEmail> {
        let marketingEmailEntity: MarketingEmailEntity;
        let userEntity = await UserEntity.findByPk(userId);
        Logger.debug(marketingEmail);

        if (userEntity == null) {
            throw new NotFoundError(ResponseMessages.USER_WITH_ID_NOT_FOUND + userId);
        }

        marketingEmailEntity = await userEntity.createMarketingEmail(AppUtils.nullPropsRemover(instanceToPlain(marketingEmail)));

        let usersToBeAdded: MarketingEmailUser[] = marketingEmail.users.map(user => new MarketingEmailUser(user.emailId, marketingEmailEntity.id));
        let addedUsers: MarketingEmailUserMappingEntity[] = await MarketingEmailUserMappingEntity.bulkCreate(AppUtils.nullPropsRemover(instanceToPlain(usersToBeAdded)));

        marketingEmail = plainToInstance(MarketingEmail, marketingEmailEntity.get({plain: true}), {excludeExtraneousValues: true});
        marketingEmail.users = plainToInstance(MarketingEmailUser, addedUsers, {excludeExtraneousValues: true});

        return marketingEmail;
    }

    //Update Query
    public async updateMarketingEmail(marketingEmail: MarketingEmail, marketingEmailId: string, userId: string): Promise<MarketingEmail> {
        let marketingEmailEntity: MarketingEmailEntity | null;
        let userEntity = await UserEntity.findByPk(userId);

        if (userEntity == null) {
            throw new NotFoundError(ResponseMessages.USER_WITH_ID_NOT_FOUND + userId);
        }

        if (marketingEmail.users == null || marketingEmail.users.length == 0) {
            marketingEmailEntity = await MarketingEmailEntity.findByPk(marketingEmailId);
        } else {
            marketingEmailEntity = await MarketingEmailEntity.findByPk(marketingEmailId, {
                include: [{
                    model: MarketingEmailUserMappingEntity,
                    as: 'users'
                }]
            });
        }

        Logger.debug("Fetched success");
        Logger.debug(marketingEmailEntity?.users);

        if (marketingEmailEntity == null) {
            throw new NotFoundError(ResponseMessages.MARKETING_EMAIL_NOT_FOUND + marketingEmailId);
        }


        if (marketingEmailEntity.users != null && marketingEmail.users != null) {
            let usersAvailable: string[] = marketingEmailEntity.users.map(user => user.emailId);
            let usersInput: string[] = marketingEmail.users.map(user => user.emailId);
            let userUnion: string[] = [...new Set([...usersAvailable, ...usersInput])];
            let userToBeAdded: string[] = userUnion.filter(item => usersAvailable.indexOf(item) < 0);
            let userToBeRemoved: string[] = userUnion.filter(item => usersInput.indexOf(item) < 0);

            await MarketingEmailUserMappingEntity.destroy(
                {where: {email_id: userToBeRemoved, marketing_email_id: marketingEmailEntity.id}}
            );

            await MarketingEmailUserMappingEntity.bulkCreate(
                AppUtils.nullPropsRemover(
                    instanceToPlain(
                        userToBeAdded.map(
                            userIdToBeMapped => new MarketingEmailUser(userIdToBeMapped, marketingEmailId)
                        )
                    )
                )
            );
        }

        marketingEmailEntity.set(AppUtils.nullPropsRemover(instanceToPlain(marketingEmail)));
        marketingEmailEntity = await marketingEmailEntity.save();

        marketingEmail = plainToInstance(MarketingEmail, marketingEmailEntity, {excludeExtraneousValues: true});
        marketingEmail.users = plainToInstance(MarketingEmailUser, await marketingEmailEntity.getUsers(), {excludeExtraneousValues: true});

        return marketingEmail;
    }

    //Delete Query


    public async deleteMarketingEmail(id: string, userId: string): Promise<void> {
        try {
            let result: [affectedCount: number] = await MarketingEmailEntity.update({active: false}, {
                where: {
                    id: id,
                    user_id: userId,
                    active: true
                }
            });
            if (!result[0]) {
                throw new NotFoundError(ResponseMessages.MARKETING_EMAIL_NOT_FOUND);
            }
        } catch (e: any) {
            if (e instanceof NotFoundError) {
                throw e;
            }
            Logger.error("Error while deleting business profile");
            throw new InternalErrorResponse();
        }
    }

    public async getAllMarketingEmail(userId: string): Promise<MarketingEmail[]> {
        let marketingEmailList: MarketingEmailEntity[] | null = await MarketingEmailEntity.findAll({
            where: {
                user_id: userId,
                active: true
            },
            include: [{
                model: MarketingEmailUserMappingEntity,
                as: 'users'
            }]
        });

        if (marketingEmailList == null) {
            throw new NotFoundError(ResponseMessages.MARKETING_EMAIL_NOT_REGISTERED);
        }

        return marketingEmailList.map(marketingEmail => plainToInstance(MarketingEmail, marketingEmail.get({plain: true}), {excludeExtraneousValues: true}));
    }

    public async getMarketingEmail(id: string, userId: string): Promise<MarketingEmail> {
        let marketingEmailEntity: MarketingEmailEntity | null = await MarketingEmailEntity.findByPk(id, {
            include: [{
                model: MarketingEmailUserMappingEntity,
                as: 'users'
            }]
        });

        if (marketingEmailEntity == null || marketingEmailEntity.userId != userId) {
            throw new NotFoundError(ResponseMessages.EMAIL_NOT_FOUND + id);
        }

        return plainToInstance(MarketingEmail, marketingEmailEntity.get({plain: true}), {excludeExtraneousValues: true});
    }

    public async getMarketingEmailUser(id: string, userId: string): Promise<MarketingEmailUser[]> {
        let userIds: string[];
        let marketingEmailEntity: MarketingEmailEntity | null = await MarketingEmailEntity.findByPk(id, {
            attributes: ['id', 'userId'],
            include: [{
                model: MarketingEmailUserMappingEntity,
                as: 'users'
            }]
        });

        if (marketingEmailEntity == null || marketingEmailEntity.userId != userId) {
            throw new NotFoundError(ResponseMessages.MARKETING_EMAIL_NOT_FOUND + id);
        }

        if (marketingEmailEntity.users == undefined || marketingEmailEntity.users.length == 0) {
            return [];
        }

        return plainToInstance(MarketingEmailUser, marketingEmailEntity.users, {excludeExtraneousValues: true});
    }

}
