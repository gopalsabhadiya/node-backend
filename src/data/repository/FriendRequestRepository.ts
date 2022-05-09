import Logger from "../../util/Logger";
import {autoInjectable} from "tsyringe";
import {instanceToPlain, plainToInstance} from "class-transformer";
import ResponseMessages from "../../util/statics/ResponseMessages";
import AppUtils from "../../util/AppUtils";
import {NotFoundError} from "../../errors/ApiError";
import FriendRequest from "../../dto/friend/FriendRequest";
import FriendRequestEntity from "../models/entity/FriendRequestEntity";
import {Sequelize} from "sequelize";
import {InternalErrorResponse} from "../../util/ApiResponse";

@autoInjectable()
export default class FriendRequestRepository {

    constructor() {
        Logger.debug("Initialising Friend Request repository");
    }

    //Fetch Queries
    public async fetchAllFriendRequests(userId: string): Promise<FriendRequest[]> {
        let friendRequestEntityList: FriendRequestEntity[] = await FriendRequestEntity.findAll({where: Sequelize.or({senderId: userId}, {receiverId: userId})});
        return plainToInstance(FriendRequest, friendRequestEntityList, {excludeExtraneousValues: false});
    }

    public async fetchSingleFriendRequest(id: string, userId: string) {
        let friendRequestEntity: FriendRequestEntity | null = await FriendRequestEntity.findByPk(id);
        if (friendRequestEntity == null) {
            throw new NotFoundError(ResponseMessages.FRIEND_REQUEST_NOT_FOUND);
        }
        return plainToInstance(FriendRequest, friendRequestEntity.get({plain: true}), {excludeExtraneousValues: true})
    }

    //Create Query
    public async createFriendRequest(friendRequest: FriendRequest, userId: string): Promise<FriendRequest> {
        let friendRequestEntity: FriendRequestEntity | null = await FriendRequestEntity.create({
            ...AppUtils.nullPropsRemover(instanceToPlain(friendRequest)),
            senderId: userId
        });
        return plainToInstance(FriendRequest, friendRequestEntity.get({plain: true}), {excludeExtraneousValues: true});

    }

    //Update Query
    public async updateFriendRequest(friendRequest: FriendRequest, friendRequestId: string, userId: string): Promise<FriendRequest> {
        let friendRequestEntity: FriendRequestEntity | null = await FriendRequestEntity.findByPk(friendRequestId);

        if (friendRequestEntity == null) {
            throw new NotFoundError(ResponseMessages.FRIEND_REQUEST_NOT_FOUND + friendRequestId);
        }

        friendRequestEntity.status = friendRequest.status;

        friendRequestEntity = await friendRequestEntity.save();

        return plainToInstance(FriendRequest, friendRequestEntity.get({plain: true}), {excludeExtraneousValues: true});
    }

    //Delete Query

    public async deleteFriendRequest(id: string, userId: string) {
        try {
            let result: [affectedCount: number] = await FriendRequestEntity.update({active: false}, {
                where: {
                    user_id: userId,
                    active: true
                }
            });
            if (!result[0]) {
                throw new NotFoundError(ResponseMessages.FRIEND_REQUEST_NOT_FOUND);
            }
        } catch (e: any) {
            if (e instanceof NotFoundError) {
                throw e;
            }
            Logger.error("Error while deleting friend request");
            throw new InternalErrorResponse();
        }
    }
}
