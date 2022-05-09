import Logger from "../../util/Logger";
import {autoInjectable} from "tsyringe";
import {NotFoundError, UnImplementedError} from "../../errors/ApiError";
import MarketingSMS from "../../dto/marketing_sms/MarketingSMS";
import UserEntity from "../models/entity/UserEntity";
import ResponseMessages from "../../util/statics/ResponseMessages";
import AppUtils from "../../util/AppUtils";
import {instanceToPlain, plainToInstance} from "class-transformer";
import MarketingSMSEntity from "../models/entity/MarketingSMSEntity";
import MarketingSMSUser from "../../dto/marketing_sms_user/MarketingSMSUser";
import MarketingSMSUserMappingEntity from "../models/entity/MarketingSMSUserMappingEntity";
import MarketingEmailEntity from "../models/entity/MarketingEmailEntity";
import MarketingEmailUserMappingEntity from "../models/entity/MarketingEmailUserMappingEntity";
import MarketingEmailUser from "../../dto/marketing_email_user/MarketingEmailUser";
import MarketingEmail from "../../dto/marketing_email/MarketingEmail";
import {InternalErrorResponse} from "../../util/ApiResponse";

@autoInjectable()
export default class MarketingSMSRepository {

    constructor() {
        Logger.debug("Initialising Marketing SMS repository");
    }


    public async addMarketingSMS(marketingSMS: MarketingSMS, userId: string): Promise<MarketingSMS> {
        let marketingSMSEntity: MarketingSMSEntity;
        let userEntity = await UserEntity.findByPk(userId);
        Logger.debug(marketingSMS);

        if (userEntity == null) {
            throw new NotFoundError(ResponseMessages.USER_WITH_ID_NOT_FOUND + userId);
        }

        marketingSMSEntity = await MarketingSMSEntity.create({...AppUtils.nullPropsRemover(instanceToPlain(marketingSMS)), userId: userId});

        let usersToBeAdded: MarketingSMSUser[] = marketingSMS.users.map(user => new MarketingSMSUser(user.contactNo, marketingSMSEntity.id));
        Logger.debug(usersToBeAdded);
        let addedUsers: MarketingSMSUserMappingEntity[] = await MarketingSMSUserMappingEntity.bulkCreate(AppUtils.nullPropsRemover(instanceToPlain(usersToBeAdded)));

        marketingSMS = plainToInstance(MarketingSMS, marketingSMSEntity.get({plain: true}), {excludeExtraneousValues: true});
        marketingSMS.users = plainToInstance(MarketingSMSUser, addedUsers, {excludeExtraneousValues: true});

        return marketingSMS;
    }

    //Update Query
    public async updateMarketingSMS(marketingSMS: MarketingSMS, marketingSMSId: string, userId: string): Promise<MarketingSMS> {
        let marketingSMSEntity: MarketingSMSEntity | null;
        let userEntity = await UserEntity.findByPk(userId);

        if (userEntity == null) {
            throw new NotFoundError(ResponseMessages.USER_WITH_ID_NOT_FOUND + userId);
        }

        if (marketingSMS.users == null || marketingSMS.users.length == 0) {
            marketingSMSEntity = await MarketingSMSEntity.findByPk(marketingSMSId);
        } else {
            marketingSMSEntity = await MarketingSMSEntity.findByPk(marketingSMSId, {
                include: [{
                    model: MarketingSMSUserMappingEntity,
                    as: 'users'
                }]
            });
        }

        Logger.debug("Fetched success");
        Logger.debug(marketingSMSEntity?.users);

        if (marketingSMSEntity == null) {
            throw new NotFoundError(ResponseMessages.MARKETING_SMS_NOT_FOUND + marketingSMSId);
        }


        if (marketingSMSEntity.users != null && marketingSMS.users != null) {
            let usersAvailable: string[] = marketingSMSEntity.users.map(user => user.contactNo);
            let usersInput: string[] = marketingSMS.users.map(user => user.contactNo);
            let userUnion: string[] = [...new Set([...usersAvailable, ...usersInput])];
            let userToBeAdded: string[] = userUnion.filter(item => usersAvailable.indexOf(item) < 0);
            let userToBeRemoved: string[] = userUnion.filter(item => usersInput.indexOf(item) < 0);

            await MarketingSMSUserMappingEntity.destroy(
                {where: {contact_no: userToBeRemoved, marketing_sms_id: marketingSMSEntity.id}}
            );

            await MarketingSMSUserMappingEntity.bulkCreate(
                AppUtils.nullPropsRemover(
                    instanceToPlain(
                        userToBeAdded.map(
                            userIdToBeMapped => new MarketingSMSUser(userIdToBeMapped, marketingSMSId)
                        )
                    )
                )
            );
        }

        marketingSMSEntity.set(AppUtils.nullPropsRemover(instanceToPlain(marketingSMS)));
        marketingSMSEntity = await marketingSMSEntity.save();

        marketingSMS = plainToInstance(MarketingSMS, marketingSMSEntity, {excludeExtraneousValues: true});
        marketingSMS.users = plainToInstance(MarketingSMSUser, await marketingSMSEntity.getUsers(), {excludeExtraneousValues: true});

        return marketingSMS;
    }

    //Delete Query


    public async deleteMarketingSMS(id: string, userId: string): Promise<void> {
        try {
            let result: [affectedCount: number] = await MarketingSMSEntity.update({active: false}, {
                where: {
                    id: id,
                    user_id: userId,
                    active: true
                }
            });
            if (!result[0]) {
                throw new NotFoundError(ResponseMessages.MARKETING_SMS_NOT_FOUND);
            }
        } catch (e: any) {
            if (e instanceof NotFoundError) {
                throw e;
            }
            Logger.error("Error while deleting business profile");
            throw new InternalErrorResponse();
        }
    }

    public async getAllMarketingSMS(userId: string): Promise<MarketingSMS[]> {
        let marketingSMSList: MarketingSMSEntity[] | null = await MarketingSMSEntity.findAll({
            where: {
                user_id: userId,
                active: true
            },
            include: [{
                model: MarketingSMSUserMappingEntity,
                as: 'users'
            }]
        });

        if (marketingSMSList == null) {
            throw new NotFoundError(ResponseMessages.MARKETING_SMS_NOT_REGISTERED);
        }

        return marketingSMSList.map(marketingSMS => plainToInstance(MarketingSMS, marketingSMS.get({plain: true}), {excludeExtraneousValues: true}));
    }

    public async getMarketingSMS(id: string, userId: string): Promise<MarketingSMS> {
        let marketingSMSEntity: MarketingSMSEntity | null = await MarketingSMSEntity.findByPk(id, {
            include: [{
                model: MarketingSMSUserMappingEntity,
                as: 'users'
            }]
        });

        if (marketingSMSEntity == null || marketingSMSEntity.userId != userId) {
            throw new NotFoundError(ResponseMessages.PRODUCTS_NOT_FOUND + id);
        }

        return plainToInstance(MarketingSMS, marketingSMSEntity.get({plain: true}), {excludeExtraneousValues: true});
    }

    public async getMarketingSMSUser(id: string, userId: string): Promise<MarketingSMSUser[]> {
        let userIds: string[];
        let marketingSMSEntity: MarketingSMSEntity | null = await MarketingSMSEntity.findByPk(id, {
            attributes: ['id', 'userId'],
            include: [{
                model: MarketingSMSUserMappingEntity,
                as: 'users'
            }]
        });

        if (marketingSMSEntity == null || marketingSMSEntity.userId != userId) {
            throw new NotFoundError(ResponseMessages.MARKETING_SMS_NOT_FOUND + id);
        }

        if (marketingSMSEntity.users == undefined || marketingSMSEntity.users.length == 0) {
            return [];
        }

        return plainToInstance(MarketingSMSUser, marketingSMSEntity.users, {excludeExtraneousValues: true});
    }


}
