import express, {Router} from "express";
import {autoInjectable} from "tsyringe";
import schema from './validation/Schema'
import UserService from "../../../../service/user/UserService";
import Logger from "../../../../util/Logger";
import validator from "../../../../util/validator";
import asyncHandler from "../../../../util/asyncHandler";
import {SuccessMsgResponse, SuccessResponse} from "../../../../util/ApiResponse";
import User from "../../../../dto/user/User";
import {instanceToPlain, plainToInstance} from "class-transformer";
import ResponseMessages from "../../../../util/statics/ResponseMessages";
import {ProtectedRequest} from "../../../../util/app-request";


@autoInjectable()
export default class PersonalProfileController {
    private _router: Router;
    private _service: UserService;

    constructor(service: UserService) {
        Logger.debug("Initialising Personal Profile Controller");
        this._router = express.Router();
        this._service = service;
    }

    routes() {
        Logger.debug("Configuring routes for User Personal Profile Registration");
        this._router.post('/register', validator(schema.register), asyncHandler(async (req: ProtectedRequest, res) => this.registerUserPersonalProfile(req, res)));
        this._router.patch('/', validator(schema.update), asyncHandler(async (req: ProtectedRequest, res) => this.updateUserPersonalProfile(req, res)));
        this._router.delete('/', asyncHandler(async (req: ProtectedRequest, res) => this.deletePersonalProfile(req, res)));
        this._router.get('/', asyncHandler(async (req: ProtectedRequest, res) => this.getPersonalProfile(req, res)));
        return this._router;
    }

    //Create
    private async registerUserPersonalProfile(req: ProtectedRequest, res: any) {
        Logger.debug("Registering Personal Profile for: " + req.sessionPayload.userId);

        let user: User = plainToInstance(User, req.body);
        user.isPersonalProfileRegistered = true;
        user = await this._service.registerUserPersonalProfile(user, req.sessionPayload.userId);

        Logger.debug("Personal Profile registered successfully");

        return new SuccessResponse(ResponseMessages.REGISTER_PERSONAL_PROFILE_SUCCESS, instanceToPlain(user)).send(res);
    }

    //Update
    private async updateUserPersonalProfile(req: ProtectedRequest, res: any) {
        Logger.debug("Updating User Personal Profile: " + req.sessionPayload.userId);

        let user: User = plainToInstance(User, req.body);
        user = await this._service.updateUserPersonalProfile(user, req.sessionPayload.userId);

        Logger.debug("Personal Profile updated successfully");

        return new SuccessResponse(ResponseMessages.UPDATE_PERSONAL_PROFILE_SUCCESS, user).send(res);
    }

    //Delete
    private async deletePersonalProfile(req: ProtectedRequest, res: any) {
        Logger.debug("Deleting Personal profile for: " + req.sessionPayload.userId);

        await this._service.deletePersonalProfile(req.sessionPayload.userId);

        Logger.debug("User profile deleted successfully");

        return new SuccessMsgResponse(ResponseMessages.PERSONAL_PROFILE_DELETED).send(res);
    }

    //Fetch
    private async getPersonalProfile(req: ProtectedRequest, res: any) {
        Logger.debug("Fetching User Personal Profile");

        let user: User = await this._service.fetchPersonalProfile(req.sessionPayload.userId);

        return new SuccessResponse(ResponseMessages.FETCH_PERSONAL_PROFILE_SUCCESS, user).send(res);
    }
}
