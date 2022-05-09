import express, {Router} from "express";
import asyncHandler from "../../../util/asyncHandler";
import validator from "../../../util/validator";
import schema from "./validation/Schema";
import Logger from "../../../util/Logger";
import {autoInjectable} from "tsyringe";
import {ProtectedRequest} from "../../../util/app-request";
import MarketingEmailService from "../../../service/marketing/MarketingEmailService";
import {ValidationSource} from "../../../util/enum/ValidationSourceEnum";
import {plainToInstance} from "class-transformer";
import {SuccessMsgResponse, SuccessResponse} from "../../../util/ApiResponse";
import ResponseMessages from "../../../util/statics/ResponseMessages";
import MarketingEmail from "../../../dto/marketing_email/MarketingEmail";
import MarketingEmailUser from "../../../dto/marketing_email_user/MarketingEmailUser";

@autoInjectable()
export default class MarketingEmailController {
    private _router: Router;
    private _marketingEmailService: MarketingEmailService;

    constructor(marketingEmailService: MarketingEmailService) {
        Logger.debug("Initialising Marketing Email Controller");
        this._router = express.Router();
        this._marketingEmailService = marketingEmailService;
    }

    routes() {
        Logger.debug("Configuring routes for Marketing Email");
        this._router.post('/', validator(schema.create), asyncHandler(async (req: ProtectedRequest, res) => this.addMarketingEmail(req, res)));
        this._router.post('/:id', validator(schema.requestParam, ValidationSource.PARAM), asyncHandler(async (req: ProtectedRequest, res) => this.sendMarketingEmail(req, res)));
        this._router.patch('/:id', validator(schema.requestParam, ValidationSource.PARAM), validator(schema.update), asyncHandler(async (req: ProtectedRequest, res) => this.updateMarketingEmail(req, res)));
        this._router.delete('/:id', validator(schema.requestParam, ValidationSource.PARAM), asyncHandler(async (req: ProtectedRequest, res) => this.deleteMarketingEmail(req, res)));
        this._router.get('/', asyncHandler(async (req: ProtectedRequest, res) => this.getAllMarketingEmail(req, res)));
        this._router.get('/:id', validator(schema.requestParam, ValidationSource.PARAM), asyncHandler(async (req: ProtectedRequest, res) => this.getSingleMarketingEmail(req, res)));
        this._router.get('/:id/users', validator(schema.requestParam, ValidationSource.PARAM), asyncHandler(async (req: ProtectedRequest, res) => this.getMarketingEmailUsers(req, res)));
        return this._router;
    }

    private async addMarketingEmail(req: ProtectedRequest, res: any) {
        Logger.debug("Adding Marketing Email for: " + req.sessionPayload.userId);

        let marketingEmail: MarketingEmail = plainToInstance(MarketingEmail, req.body);
        marketingEmail = await this._marketingEmailService.addMarketingEmail(marketingEmail, req.sessionPayload.userId);

        Logger.debug("Marketing Email created successfully");

        return new SuccessResponse(ResponseMessages.EMAIL_CREATE_SUCCESS, marketingEmail).send(res);
    }

    private async sendMarketingEmail(req: ProtectedRequest, res: any) {
        Logger.debug("Sending Marketing Email for: " + req.sessionPayload.userId);

        await this._marketingEmailService.sendMarketingEmail(req.params.id, req.sessionPayload.userId);

        return new SuccessMsgResponse(ResponseMessages.EMAIL_SEND_SUCCESS).send(res);
    }

    private async updateMarketingEmail(req: ProtectedRequest, res: any) {
        Logger.debug("Updating Marketing Email for: " + req.sessionPayload.userId);

        let marketingEmail: MarketingEmail = plainToInstance(MarketingEmail, req.body);
        marketingEmail = await this._marketingEmailService.updateMarketingEmail(marketingEmail, req.params.id, req.sessionPayload.userId);

        Logger.debug("Marketing Email created successfully");

        return new SuccessResponse(ResponseMessages.EMAIL_UPDATE_SUCCESS, marketingEmail).send(res);
    }

    private async deleteMarketingEmail(req: ProtectedRequest, res: any) {
        Logger.debug("Deleting Marketing Email for: " + req.sessionPayload.userId);

        await this._marketingEmailService.deleteMarketingEmail(req.params.id, req.sessionPayload.userId);

        Logger.debug("Marketing Email deleted successfully");

        return new SuccessMsgResponse(ResponseMessages.EMAIL_DELETE_SUCCESS).send(res);
    }

    private async getAllMarketingEmail(req: ProtectedRequest, res: any) {
        Logger.debug("Fetching all Marketing Email for: " + req.sessionPayload.userId);

        let marketingEmails: MarketingEmail[] = await this._marketingEmailService.getAllMarketingEmail(req.sessionPayload.userId);

        Logger.debug("Marketing Email fetched successfully");

        return new SuccessResponse(ResponseMessages.EMAIL_FETCH_ALL_SUCCESS, marketingEmails).send(res);
    }

    private async getSingleMarketingEmail(req: ProtectedRequest, res: any) {
        Logger.debug("Fetching single Marketing Email: " + req.sessionPayload.userId);

        let marketingEmail: MarketingEmail = await this._marketingEmailService.getMarketingEmail(req.params.id, req.sessionPayload.userId);

        Logger.debug("Single Marketing Email fetched successfully");

        return new SuccessResponse(ResponseMessages.EMAIL_FETCH_SINGLE_SUCCESS, marketingEmail).send(res);
    }

    private async getMarketingEmailUsers(req: ProtectedRequest, res: any) {
        Logger.debug("Fetching Users for Email: " + req.sessionPayload.userId);

        let users: MarketingEmailUser[] = await this._marketingEmailService.getMarketingEmailUsers(req.params.id, req.sessionPayload.userId);

        Logger.debug("Users for Email fetched successfully");

        return new SuccessResponse(ResponseMessages.EMAIL_FETCH_USERS_SUCCESS, users).send(res);
    }


}
