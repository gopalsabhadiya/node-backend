import FriendRequest from "../../dto/friend/FriendRequest";
import Logger from "../../util/Logger";
import FriendRequestRepository from "../../data/repository/FriendRequestRepository";
import {autoInjectable} from "tsyringe";
import UserRepository from "../../data/repository/UserRepository";
import {NotFoundError} from "../../errors/ApiError";
import ResponseMessages from "../../util/statics/ResponseMessages";

@autoInjectable()
export default class FriendRequestService {

    private _friendRequestRepository: FriendRequestRepository;
    private _userRepository: UserRepository;

    constructor(friendRequestRepository: FriendRequestRepository, userRepository: UserRepository) {
        Logger.debug("Initialising Marketing Email service");
        this._friendRequestRepository = friendRequestRepository;
        this._userRepository = userRepository;
    }

    public async createFriendRequest(friendRequest: FriendRequest, userId: string): Promise<FriendRequest> {
        let allUsersExist = await this._userRepository.checkIfUserListExists([friendRequest.receiverId, userId]);
        if(!allUsersExist) {
            throw new NotFoundError(ResponseMessages.USER_WITH_ID_NOT_FOUND + friendRequest.receiverId);
        }
        return this._friendRequestRepository.createFriendRequest(friendRequest, userId);
    }

    public async updateFriendRequest(friendRequest: FriendRequest, friendRequestId: string, userId: string) {
        return this._friendRequestRepository.updateFriendRequest(friendRequest, friendRequestId, userId);
    }

    public async fetchAllFriendRequests(userId: string): Promise<FriendRequest[]> {
        return this._friendRequestRepository.fetchAllFriendRequests(userId);
    }

    public async fetchSingleFriendRequest(id: string, userId: string) {
        return this._friendRequestRepository.fetchSingleFriendRequest(id, userId);
    }

    public async deleteFriendRequest(id: string, userId: string) {
        return this._friendRequestRepository.deleteFriendRequest(id, userId);
    }
}
