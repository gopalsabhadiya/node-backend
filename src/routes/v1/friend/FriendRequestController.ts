import express, {Router} from "express";
import asyncHandler from "../../../util/asyncHandler";
import validator from "../../../util/validator";
import schema from "./validation/Schema";
import Logger from "../../../util/Logger";
import {autoInjectable} from "tsyringe";
import {ProtectedRequest} from "../../../util/app-request";
import FriendRequestService from "../../../service/friend/FriendRequestService";
import {plainToInstance} from "class-transformer";
import FriendRequest from "../../../dto/friend/FriendRequest";
import {SuccessMsgResponse, SuccessResponse} from "../../../util/ApiResponse";
import ResponseMessages from "../../../util/statics/ResponseMessages";
import {ValidationSource} from "../../../util/enum/ValidationSourceEnum";

@autoInjectable()
export default class FriendRequestController {
    private _router: Router;
    private _friendRequestService: FriendRequestService;

    constructor(friendRequestService: FriendRequestService) {
        Logger.debug("Initialising Friend Request Controller");
        this._router = express.Router();
        this._friendRequestService = friendRequestService;
    }

    routes() {
        Logger.debug("Configuring routes for Marketing Email");
        this._router.post('/', validator(schema.create), asyncHandler(async (req: ProtectedRequest, res) => this.createFriendRequest(req, res)));
        this._router.patch('/:id', validator(schema.update), validator(schema.requestParam, ValidationSource.PARAM), asyncHandler(async (req: ProtectedRequest, res) => this.updateFriendRequest(req, res)));
        this._router.get('/', asyncHandler(async (req: ProtectedRequest, res) => this.fetchAllFriendRequests(req, res)));
        this._router.get('/:id', asyncHandler(async (req: ProtectedRequest, res) => this.fetchSingleFriendRequest(req, res)));
        this._router.delete('/:id', asyncHandler(async (req: ProtectedRequest, res) => this.deleteFriendRequest(req, res)));
        return this._router;
    }

    private async createFriendRequest(req: ProtectedRequest, res: any) {
        Logger.debug("Adding Friend Request for: " + req.sessionPayload.userId);

        let friendRequest: FriendRequest = plainToInstance(FriendRequest, req.body);
        friendRequest = await this._friendRequestService.createFriendRequest(friendRequest, req.sessionPayload.userId);

        Logger.debug("Friend Request created successfully");

        return new SuccessResponse(ResponseMessages.FRIEND_REQUEST_CREATE_SUCCESS, friendRequest).send(res);
    }

    private async updateFriendRequest(req: ProtectedRequest, res: any) {
        Logger.debug("Updating Friend Request for: " + req.sessionPayload.userId);

        let friendRequest: FriendRequest = plainToInstance(FriendRequest, req.body);
        friendRequest = await this._friendRequestService.updateFriendRequest(friendRequest, req.params.id, req.sessionPayload.userId);

        Logger.debug("Friend Request updated successfully");

        return new SuccessResponse(ResponseMessages.FRIEND_REQUEST_UPDATE_SUCCESS, friendRequest).send(res);
    }

    private async fetchAllFriendRequests(req: ProtectedRequest, res: any) {
        Logger.debug("Fetching All Friend Request for: " + req.sessionPayload.userId);

        let  friendRequest: FriendRequest[] = await this._friendRequestService.fetchAllFriendRequests(req.sessionPayload.userId);

        Logger.debug("All Friend Request fetched successfully");

        return new SuccessResponse(ResponseMessages.FRIEND_REQUEST_FETCH_SUCCESS, friendRequest).send(res);
    }

    private async fetchSingleFriendRequest(req: ProtectedRequest, res: any) {
        Logger.debug("Fetching Friend Request for: " + req.sessionPayload.userId);

        let  friendRequest: FriendRequest = await this._friendRequestService.fetchSingleFriendRequest(req.params.id, req.sessionPayload.userId);

        Logger.debug("Friend Request fetched successfully");

        return new SuccessResponse(ResponseMessages.FRIEND_REQUEST_FETCH_SUCCESS, friendRequest).send(res);
    }

    private async deleteFriendRequest(req: ProtectedRequest, res: any) {
        Logger.debug("Fetching Friend Request for: " + req.sessionPayload.userId);

        await this._friendRequestService.deleteFriendRequest(req.params.id, req.sessionPayload.userId);

        Logger.debug("Friend Request deleted successfully");

        return new SuccessMsgResponse(ResponseMessages.FRIEND_REQUEST_DELETE_SUCCESS).send(res);

    }
}
