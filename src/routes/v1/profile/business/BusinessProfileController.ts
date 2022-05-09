import express, {Router} from "express";
import {autoInjectable} from "tsyringe";
import schema from './validation/Schema'
import Logger from "../../../../util/Logger";
import validator from "../../../../util/validator";
import asyncHandler from "../../../../util/asyncHandler";
import {plainToInstance} from "class-transformer";
import {SuccessMsgResponse, SuccessResponse} from "../../../../util/ApiResponse";
import ResponseMessages from "../../../../util/statics/ResponseMessages";
import BusinessService from "../../../../service/business/BusinessService";
import {ProtectedRequest} from "../../../../util/app-request";
import Business from "../../../../dto/business/Business";


@autoInjectable()
export default class BusinessProfileController {
    private _router: Router;
    private _businessService: BusinessService;

    constructor(businessService: BusinessService) {
        Logger.debug("Initialising Business profile Controller");
        this._router = express.Router();
        this._businessService = businessService;
    }

    routes() {
        Logger.debug("Configuring routes for User Business Profile Registration");
        this._router.post('/register', validator(schema.register), asyncHandler(async (req: ProtectedRequest, res) => this.registerBusinessProfile(req, res)));
        this._router.patch('/', validator(schema.update), asyncHandler(async (req: ProtectedRequest, res) => this.updateBusinessProfile(req, res)));
        this._router.delete('/', asyncHandler(async (req: ProtectedRequest, res) => this.deleteBusinessProfile(req, res)));
        this._router.get('/', asyncHandler(async (req: ProtectedRequest, res) => this.getBusinessProfile(req, res)));
        return this._router;
    }

    //Create
    private async registerBusinessProfile(req: ProtectedRequest, res: any) {
        Logger.debug("Registering User Business Profile for: " + req.sessionPayload.userId);

        let business: Business = plainToInstance(Business, req.body);
        business = await this._businessService.registerUserBusinessProfile(business, req.sessionPayload.userId);

        Logger.debug("Business profile registered successfully");

        return new SuccessResponse(ResponseMessages.REGISTER_BUSINESS_PROFILE_SUCCESS, business).send(res);
    }

    //Update
    private async updateBusinessProfile(req: ProtectedRequest, res: any) {
        Logger.debug("Updating Business Profile for: " + req.sessionPayload.userId);

        let business: Business = plainToInstance(Business, req.body);
        business = await this._businessService.updateBusinessProfile(business, req.sessionPayload.userId);

        Logger.debug("Business profile Updated successfully");

        return new SuccessResponse(ResponseMessages.UPDATE_BUSINESS_PROFILE_SUCCESS, business).send(res);
    }

    //Delete
    private async deleteBusinessProfile(req: ProtectedRequest, res: any) {
        Logger.debug("Deleting Business profile for: " + req.sessionPayload.userId);

        await this._businessService.deleteBusinessProfile(req.sessionPayload.userId);

        Logger.debug("Business profile deleted successfully");

        return new SuccessMsgResponse(ResponseMessages.PERSONAL_PROFILE_DELETED).send(res);
    }

    //Fetch
    private async getBusinessProfile(req: ProtectedRequest, res: any) {
        Logger.debug("Fetching Business Personal Profile");

        let business: Business = await this._businessService.fetchBusinessProfile(req.sessionPayload.userId);

        Logger.debug("Business profile fetched successfully");

        return new SuccessResponse(ResponseMessages.FETCH_PERSONAL_PROFILE_SUCCESS, business).send(res);
    }
}
