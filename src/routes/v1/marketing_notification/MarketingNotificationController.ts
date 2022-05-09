import express, {Router} from "express";
import asyncHandler from "../../../util/asyncHandler";
import validator from "../../../util/validator";
import schema from "./validation/Schema";
import Logger from "../../../util/Logger";
import {autoInjectable} from "tsyringe";
import {ProtectedRequest} from "../../../util/app-request";
import MarketingNotificationService from "../../../service/marketing/MarketingNotificationService";
import MarketingNotification from "../../../dto/marketing_notification/MarketingNotification";
import {plainToInstance} from "class-transformer";
import ResponseMessages from "../../../util/statics/ResponseMessages";
import {SuccessMsgResponse, SuccessResponse} from "../../../util/ApiResponse";
import {ValidationSource} from "../../../util/enum/ValidationSourceEnum";
import User from "../../../dto/user/User";

@autoInjectable()
export default class MarketingNotificationController {
    private readonly _router: Router;
    private _marketingNotificationService: MarketingNotificationService;

    constructor(marketingNotificationService: MarketingNotificationService) {
        Logger.debug("Initialising Marketing Notification Controller");
        this._router = express.Router();
        this._marketingNotificationService = marketingNotificationService;
    }

    routes() {
        Logger.debug("Configuring routes for Marketing Notification");
        this._router.post('/', validator(schema.create), asyncHandler(async (req: ProtectedRequest, res) => this.addMarketingNotification(req, res)));
        this._router.post('/:id', validator(schema.requestParam, ValidationSource.PARAM), asyncHandler(async (req: ProtectedRequest, res) => this.sendMarketingNotification(req, res)));
        this._router.patch('/:id', validator(schema.requestParam, ValidationSource.PARAM), validator(schema.update), asyncHandler(async (req: ProtectedRequest, res) => this.updateMarketingNotification(req, res)));
        this._router.delete('/:id', validator(schema.requestParam, ValidationSource.PARAM), asyncHandler(async (req: ProtectedRequest, res) => this.deleteMarketingNotification(req, res)));
        this._router.get('/', asyncHandler(async (req: ProtectedRequest, res) => this.getAllMarketingNotifications(req, res)));
        this._router.get('/:id', validator(schema.requestParam, ValidationSource.PARAM), asyncHandler(async (req: ProtectedRequest, res) => this.getSingleMarketingNotification(req, res)));
        this._router.get('/:id/users', validator(schema.requestParam, ValidationSource.PARAM), asyncHandler(async (req: ProtectedRequest, res) => this.getMarketingNotificationUsers(req, res)));
        return this._router;
    }

    private async addMarketingNotification(req: ProtectedRequest, res: any) {
        Logger.debug("Adding Marketing Notification for: " + req.sessionPayload.userId);
        Logger.debug(req.sessionPayload);

        let marketingNotification: MarketingNotification = plainToInstance(MarketingNotification, req.body);
        marketingNotification = await this._marketingNotificationService.addMarketingNotification(marketingNotification, req.sessionPayload.userId);

        Logger.debug("Marketing Notification created successfully");

        return new SuccessResponse(ResponseMessages.NOTIFICATION_CREATE_SUCCESS, marketingNotification).send(res);
    }

    private async sendMarketingNotification(req: ProtectedRequest, res: any) {
        Logger.debug("Sending Marketing Notification for: " + req.sessionPayload.userId);

        await this._marketingNotificationService.sendMarketingNotification(req.params.id, req.sessionPayload.userId);

        return new SuccessMsgResponse(ResponseMessages.NOTIFICATION_SEND_SUCCESS).send(res);
    }

    private async updateMarketingNotification(req: ProtectedRequest, res: any) {
        Logger.debug("Updating Marketing Notification for: " + req.sessionPayload.userId);

        let marketingNotification: MarketingNotification = plainToInstance(MarketingNotification, req.body);
        marketingNotification = await this._marketingNotificationService.updateMarketingNotification(marketingNotification, req.params.id, req.sessionPayload.userId);

        Logger.debug("Marketing Notification created successfully");

        return new SuccessResponse(ResponseMessages.NOTIFICATION_UPDATE_SUCCESS, marketingNotification).send(res);
    }

    private async deleteMarketingNotification(req: ProtectedRequest, res: any) {
        Logger.debug("Deleting Marketing notification for: " + req.sessionPayload.userId);

        await this._marketingNotificationService.deleteMarketingNotification(req.params.id, req.sessionPayload.userId);

        Logger.debug("Marketing notification deleted successfully");

        return new SuccessMsgResponse(ResponseMessages.NOTIFICATION_DELETE_SUCCESS).send(res);
    }

    private async getAllMarketingNotifications(req: ProtectedRequest, res: any) {
        Logger.debug("Fetching all Marketing notification for: " + req.sessionPayload.userId);

        let marketingNotifications: MarketingNotification[] = await this._marketingNotificationService.getAllMarketingNotifications(req.sessionPayload.userId);

        Logger.debug("Marketing notification fetched successfully");

        return new SuccessResponse(ResponseMessages.NOTIFICATION_FETCH_ALL_SUCCESS, marketingNotifications).send(res);
    }

    private async getSingleMarketingNotification(req: ProtectedRequest, res: any) {
        Logger.debug("Fetching single Marketing notification: " + req.sessionPayload.userId);

        let marketingNotification: MarketingNotification = await this._marketingNotificationService.getMarketingNotification(req.params.id, req.sessionPayload.userId);

        Logger.debug("Single Marketing notification fetched successfully");

        return new SuccessResponse(ResponseMessages.NOTIFICATION_FETCH_SINGLE_SUCCESS, marketingNotification).send(res);
    }

    private async getMarketingNotificationUsers(req: ProtectedRequest, res: any) {
        Logger.debug("Fetching Users for notification: " + req.sessionPayload.userId);

        let users: User[] = await this._marketingNotificationService.getMarketingNotificationUsers(req.params.id, req.sessionPayload.userId);

        Logger.debug("Users for notification fetched successfully");

        return new SuccessResponse(ResponseMessages.NOTIFICATION_FETCH_USERS_SUCCESS, users).send(res);
    }

}
