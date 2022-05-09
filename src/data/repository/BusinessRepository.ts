import Logger from "../../util/Logger";
import {autoInjectable} from "tsyringe";
import UserEntity from "../models/entity/UserEntity";
import {instanceToPlain, plainToInstance} from "class-transformer";
import {InternalErrorResponse, NotFoundResponse} from "../../util/ApiResponse";
import ResponseMessages from "../../util/statics/ResponseMessages";
import AppUtils from "../../util/AppUtils";
import BusinessEntity from "../models/entity/BusinessEntity";
import {NotFoundError} from "../../errors/ApiError";
import Business from "../../dto/business/Business";

@autoInjectable()
export default class BusinessRepository {

    constructor() {
        Logger.debug("Initialising Business repository");
    }

    //Fetch Queries
    public async fetchBusinessProfile(userId: string): Promise<Business> {
        let businessEntity: BusinessEntity | null = await BusinessEntity.findOne({
            where: {
                user_id: userId,
                active: true
            }
        });

        if (businessEntity == null) {
            throw new NotFoundError(ResponseMessages.BUSINESS_PROFILE_NOT_REGISTERED + userId);
        }

        return plainToInstance(Business, businessEntity.get({plain: true}), {excludeExtraneousValues: true});
    }

    //Create Query
    public async registerUserBusiness(business: Business, userId: string): Promise<Business> {
        let businessEntity;
        let userEntity = await UserEntity.findByPk(userId, {include: [{model: BusinessEntity, as: 'business'}]});

        if (userEntity == null) {
            throw new NotFoundError(ResponseMessages.USER_WITH_ID_NOT_FOUND + userId);
        }

        if (userEntity.business != null) {
            throw new NotFoundError(ResponseMessages.BUSINESS_ALREADY_REGISTERED);
        }

        businessEntity = await userEntity.createBusiness(AppUtils.nullPropsRemover(instanceToPlain(business)));
        userEntity.set({isBusinessProfileRegistered: true});
        await userEntity.save();

        return plainToInstance(Business, businessEntity.get({plain: true}), {excludeExtraneousValues: true});
    }

    //Update Query
    public async updateBusinessProfile(business: Business, userId: string): Promise<Business> {
        let businessEntity;
        let userEntity = await UserEntity.findByPk(userId, {
            include: [{model: BusinessEntity, as: "business"}],
            attributes: ['id']
        });

        if (userEntity == null) {
            throw new NotFoundError(ResponseMessages.USER_WITH_ID_NOT_FOUND + userId);
        }

        businessEntity = await userEntity.business;
        if (businessEntity == undefined) {
            throw new NotFoundResponse(ResponseMessages.UPDATE_BUSINESS_NOT_FOUND);
        }
        businessEntity.set(AppUtils.nullPropsRemover(instanceToPlain(business)));
        businessEntity = await businessEntity.save();

        return plainToInstance(Business, businessEntity.get({plain: true}), {excludeExtraneousValues: true});
    }

    //Delete Query
    public async deleteBusinessProfile(userId: string): Promise<void> {
        try {
            let result: [affectedCount: number] = await BusinessEntity.update({active: false}, {
                where: {
                    user_id: userId,
                    active: true
                }
            });
            if (!result[0]) {
                throw new NotFoundError(ResponseMessages.BUSINESS_PROFILE_NOT_REGISTERED);
            }
        } catch (e: any) {
            if (e instanceof NotFoundError) {
                throw e;
            }
            Logger.error("Error while deleting business profile");
            throw new InternalErrorResponse();
        }
    }

}
