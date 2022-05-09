import express, {Router} from "express";
import {autoInjectable} from "tsyringe";
import schema from './validation/Schema'
import Logger from "../../../../util/Logger";
import validator from "../../../../util/validator";
import asyncHandler from "../../../../util/asyncHandler";
import {instanceToPlain} from "class-transformer";
import {SuccessResponse} from "../../../../util/ApiResponse";
import ResponseMessages from "../../../../util/statics/ResponseMessages";
import {ProtectedRequest} from "../../../../util/app-request";
import UserService from "../../../../service/user/UserService";
import User from "../../../../dto/user/User";


@autoInjectable()
export default class ProfileController {
    private _router: Router;
    private _userService: UserService;

    constructor(userService: UserService) {
        Logger.debug("Initialising Business profile Controller");
        this._router = express.Router();
        this._userService = userService;
    }

    routes() {
        Logger.debug("Configuring routes for User Business Profile Registration");
        this._router.patch('/', validator(schema.update), asyncHandler(async (req: ProtectedRequest, res) => this.changeProfileType(req, res)));
        return this._router;
    }

    private async changeProfileType(req: ProtectedRequest, res: any) {
        Logger.debug(`Updating Profile Type.....`);

        let user: User = await this._userService.updateProfileType(req.body.type, req.sessionPayload.userId);

        return new SuccessResponse(ResponseMessages.REGISTER_BUSINESS_PROFILE_SUCCESS, instanceToPlain(user)).send(res);
    }

}
