import express, {Router} from "express";
import asyncHandler from "../../../util/asyncHandler";
import validator from "../../../util/validator";
import schema from "./validation/Schema";
import Logger from "../../../util/Logger";
import {autoInjectable} from "tsyringe";
import {ProtectedRequest} from "../../../util/app-request";
import MarketingSMSService from "../../../service/marketing/MarketingSMSService";
import {ValidationSource} from "../../../util/enum/ValidationSourceEnum";
import {plainToInstance} from "class-transformer";
import {SuccessMsgResponse, SuccessResponse} from "../../../util/ApiResponse";
import ResponseMessages from "../../../util/statics/ResponseMessages";
import MarketingSMS from "../../../dto/marketing_sms/MarketingSMS";
import MarketingSMSUser from "../../../dto/marketing_sms_user/MarketingSMSUser";

@autoInjectable()
export default class MarketingSMSController {
    private _router: Router;
    private _marketingSMSService: MarketingSMSService;

    constructor(marketingSMSService: MarketingSMSService) {
        Logger.debug("Initialising Payment Controller");
        this._router = express.Router();
        this._marketingSMSService = marketingSMSService;
    }

    routes() {
        Logger.debug("Configuring routes for Payment");
        this._router.post('/', validator(schema.create), asyncHandler(async (req: ProtectedRequest, res) => this.addMarketingSMS(req, res)));
        this._router.post('/:id', validator(schema.requestParam, ValidationSource.PARAM), asyncHandler(async (req: ProtectedRequest, res) => this.sendMarketingSMS(req, res)));
        this._router.patch('/:id', validator(schema.requestParam, ValidationSource.PARAM), validator(schema.update), asyncHandler(async (req: ProtectedRequest, res) => this.updateMarketingSMS(req, res)));
        this._router.delete('/:id', validator(schema.requestParam, ValidationSource.PARAM), asyncHandler(async (req: ProtectedRequest, res) => this.deleteMarketingSMS(req, res)));
        this._router.get('/', asyncHandler(async (req: ProtectedRequest, res) => this.getAllMarketingSMS(req, res)));
        this._router.get('/:id', validator(schema.requestParam, ValidationSource.PARAM), asyncHandler(async (req: ProtectedRequest, res) => this.getSingleMarketingSMS(req, res)));
        this._router.get('/:id/users', validator(schema.requestParam, ValidationSource.PARAM), asyncHandler(async (req: ProtectedRequest, res) => this.getMarketingSMSUsers(req, res)));
        return this._router;
    }

    private async addMarketingSMS(req: ProtectedRequest, res: any) {
        Logger.debug("Adding Marketing SMS for: " + req.sessionPayload.userId);
        Logger.debug(req.sessionPayload);

        let marketingSMS: MarketingSMS = plainToInstance(MarketingSMS, req.body);
        marketingSMS = await this._marketingSMSService.addMarketingSMS(marketingSMS, req.sessionPayload.userId);

        Logger.debug("Marketing SMS created successfully");

        return new SuccessResponse(ResponseMessages.SMS_CREATE_SUCCESS, marketingSMS).send(res);
    }

    private async sendMarketingSMS(req: ProtectedRequest, res: any) {
        Logger.debug("Sending Marketing SMS for: " + req.sessionPayload.userId);

        await this._marketingSMSService.sendMarketingSMS(req.params.id, req.sessionPayload.userId);

        return new SuccessMsgResponse(ResponseMessages.SMS_SEND_SUCCESS).send(res);
    }

    private async updateMarketingSMS(req: ProtectedRequest, res: any) {
        Logger.debug("Updating Marketing SMS for: " + req.sessionPayload.userId);

        let marketingSMS: MarketingSMS = plainToInstance(MarketingSMS, req.body);
        marketingSMS = await this._marketingSMSService.updateMarketingSMS(marketingSMS, req.params.id, req.sessionPayload.userId);

        Logger.debug("Marketing SMS created successfully");

        return new SuccessResponse(ResponseMessages.SMS_UPDATE_SUCCESS, marketingSMS).send(res);
    }

    private async deleteMarketingSMS(req: ProtectedRequest, res: any) {
        Logger.debug("Deleting Marketing SMS for: " + req.sessionPayload.userId);

        await this._marketingSMSService.deleteMarketingSMS(req.params.id, req.sessionPayload.userId);

        Logger.debug("Marketing SMS deleted successfully");

        return new SuccessMsgResponse(ResponseMessages.SMS_DELETE_SUCCESS).send(res);
    }

    private async getAllMarketingSMS(req: ProtectedRequest, res: any) {
        Logger.debug("Fetching all Marketing SMS for: " + req.sessionPayload.userId);

        let marketingSMS: MarketingSMS[] = await this._marketingSMSService.getAllMarketingSMS(req.sessionPayload.userId);

        Logger.debug("Marketing SMS fetched successfully");

        return new SuccessResponse(ResponseMessages.SMS_FETCH_ALL_SUCCESS, marketingSMS).send(res);
    }

    private async getSingleMarketingSMS(req: ProtectedRequest, res: any) {
        Logger.debug("Fetching single Marketing SMS: " + req.sessionPayload.userId);

        let marketingSMS: MarketingSMS = await this._marketingSMSService.getMarketingSMS(req.params.id, req.sessionPayload.userId);

        Logger.debug("Single Marketing SMS fetched successfully");

        return new SuccessResponse(ResponseMessages.SMS_FETCH_SINGLE_SUCCESS, marketingSMS).send(res);
    }

    private async getMarketingSMSUsers(req: ProtectedRequest, res: any) {
        Logger.debug("Fetching Users for SMS: " + req.sessionPayload.userId);

        let users: MarketingSMSUser[] = await this._marketingSMSService.getMarketingSMSUsers(req.params.id, req.sessionPayload.userId);

        Logger.debug("Users for SMS fetched successfully");

        return new SuccessResponse(ResponseMessages.SMS_FETCH_USERS_SUCCESS, users).send(res);
    }


}
