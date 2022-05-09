import Logger from "../../util/Logger";
import {autoInjectable} from "tsyringe";
import UserEntity from "../models/entity/UserEntity";
import {instanceToPlain, plainToInstance} from "class-transformer";
import {BadTokenError, NotFoundError, BadRequestError} from "../../errors/ApiError";
import User from "../../dto/user/User";
import {InternalErrorResponse, NotFoundResponse} from "../../util/ApiResponse";
import ResponseMessages from "../../util/statics/ResponseMessages";
import AppUtils from "../../util/AppUtils";
import {ProfileTypeEnum} from "../../util/enum/ProfileTypeEnum";

@autoInjectable()
export default class UserRepository {

    constructor() {
        Logger.debug("Initialising user repository");
    }

    //Fetch Queries
    public async getUserIdByContactNo(contactNo: string): Promise<string | null> {
        let userEntity = await UserEntity.findOne({where: {contactNo: contactNo}, attributes: ['id']});
        if (userEntity == null) {
            return null;
        }
        return userEntity.id;
    }

    public async getUserById(userId: string): Promise<User> {
        let userEntity: UserEntity | null = await UserEntity.findByPk(userId);

        if (userEntity != null) {
            return plainToInstance(User, userEntity.get({plain: true}), {excludeExtraneousValues: true});
        } else {
            throw new BadTokenError();
        }
    }

    public async getAllUsersById(userIds: string[]): Promise<User[]> {
        let userEntityList: UserEntity[] | null = await UserEntity.findAll({where: {id: userIds}});

        if (userEntityList != null) {
            return plainToInstance(User, userEntityList, {excludeExtraneousValues: true});
        } else {
            throw new BadTokenError();
        }
    }

    public async fetchPersonalProfile(userId: string): Promise<User> {
        let userEntity: UserEntity | null = await UserEntity.findByPk(userId, {having: {active: true}});

        if (userEntity == null) {
            throw new NotFoundError(ResponseMessages.USER_WITH_ID_NOT_FOUND + userId);
        }

        return plainToInstance(User, userEntity.get({plain: true}), {excludeExtraneousValues: true});
    }

    public async checkIfUserListExists(userIdList: string[]): Promise<boolean> {
        let count = await UserEntity.count({where: {id: userIdList}})
        return userIdList.length == count;
    }

    //Create Query
    public async registerUserPersonalProfile(user: User, userId: string): Promise<User> {
        let addressEntity;

        let userEntity = await UserEntity.findByPk(userId);

        if (userEntity == null) {
            throw new NotFoundError(ResponseMessages.USER_WITH_ID_NOT_FOUND + user.id);
        }

        if(userEntity.fullName){
            throw new BadRequestError(ResponseMessages.USER_PERSONAL_PROFILE_ALREADY_REGISTERED);
        }

        userEntity.set(AppUtils.nullPropsRemover(instanceToPlain(user)));
        userEntity = await userEntity.save();
        // Logger.debug(user.address);
        // if (user.address != null) {
        //     try {
        //         addressEntity = await userEntity.createAddress(AppUtils.nullPropsRemover(instanceToPlain(user.address)));
        //     }
        //     catch(e: any) {
        //         Logger.error(e.stack);
        //         throw e;
        //     }
        // }

        Logger.debug("User Profile Registered")

        let userDTO = plainToInstance(User, userEntity.get({plain: true}), {excludeExtraneousValues: true});
        // if (addressEntity != null) {
        //     userDTO.address = plainToInstance(Address, addressEntity.get({plain: true}), {excludeExtraneousValues: true});
        // }

        return userDTO;
    }

    public async createUserWithContactNo(contactNo: string): Promise<User> {
        let userEntity;

        userEntity = UserEntity.build({raw: true});
        userEntity.set({
            contactNo: contactNo,
        });
        await userEntity.save();
        Logger.debug(userEntity.get({plain: true}));

        return plainToInstance(User, userEntity.get({plain: true}), {excludeExtraneousValues: true});
    }

    //Update Query
    public async updateUserPersonalProfile(user: User, userId: string): Promise<User> {
        let userEntity = await UserEntity.findByPk(userId);

        if (userEntity == null) {
            throw new NotFoundError(ResponseMessages.USER_WITH_ID_NOT_FOUND + userId);
        }

        userEntity.set(AppUtils.nullPropsRemover(instanceToPlain(user)));
        userEntity = await userEntity.save();

        return plainToInstance(User, userEntity.get({plain: true}), {excludeExtraneousValues: true});
    }

    public async updateProfileType(type: ProfileTypeEnum, userId: string): Promise<User> {
        let userEntity = await UserEntity.findByPk(userId);

        if (userEntity == null) {
            throw new NotFoundError(ResponseMessages.USER_WITH_ID_NOT_FOUND + userId);
        }

        userEntity.set({type: type});
        userEntity = await userEntity.save();
        return plainToInstance(User, userEntity.get({plain: true}), {excludeExtraneousValues: true});
    }

    //Delete Query
    public async deletePersonalProfile(userId: string): Promise<void> {
        try {
            let result: [affectedCount: number] = await UserEntity.update({active: false}, {
                where: {
                    id: userId,
                    active: true
                }
            });
            if (!result[0]) {
                throw new NotFoundError(ResponseMessages.PERSONAL_PROFILE_NOT_REGISTERED);
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
