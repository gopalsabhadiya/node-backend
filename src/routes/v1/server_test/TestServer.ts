import express, {Router} from "express";
import asyncHandler from "../../../util/asyncHandler";
import validator from "../../../util/validator";
import schema from "./validation/Schema";
import {SuccessResponse} from "../../../util/ApiResponse";
import ResponseMessages from "../../../util/statics/ResponseMessages";
import {autoInjectable} from "tsyringe";
import Logger from "../../../util/Logger";

@autoInjectable()
export default class ServerTestController {
    private _router: Router;

    constructor() {
        Logger.debug("Initialising Test Server Controller");
        this._router = express.Router();
    }

    routes() {
        Logger.debug("Configuring routes for Test Server");
        this._router.post('/', validator(schema.testPayload), asyncHandler(this.testPayloadController));
        return this._router;
    }

    private async testPayloadController(req: any, res: any) {
        Logger.debug("Testing API server");
        return new SuccessResponse(ResponseMessages.TEST_SERVER_SUCCESS, {}).send(res);
    }
}
