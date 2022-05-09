import express, {Router} from "express";
import asyncHandler from "../../../util/asyncHandler";
import {SuccessResponse} from "../../../util/ApiResponse";
import ResponseMessages from "../../../util/statics/ResponseMessages";
import {autoInjectable} from "tsyringe";
import Logger from "../../../util/Logger";
import {ProtectedRequest} from "../../../util/app-request";
import SubscriptionPlanService from "../../../service/subscriptionplan/SubscriptionPlanService";
import SubscriptionPlan from "../../../dto/subscription_plan/SubscriptionPlan";

@autoInjectable()
export default class SubscriptionPlanController {
    private _router: Router;
    private _subscriptionPlanService: SubscriptionPlanService;

    constructor(subscriptionPlanService: SubscriptionPlanService) {
        Logger.debug("Initialising Subscription Controller");
        this._router = express.Router();
        this._subscriptionPlanService = subscriptionPlanService;
    }

    routes() {
        Logger.debug("Configuring routes for Subscription plan");
        this._router.get('/:plan_type', asyncHandler(async (req: ProtectedRequest, res) => this.getPlanDetails(req, res)));
        return this._router;
    }

    private async getPlanDetails(req: ProtectedRequest, res: any) {
        Logger.debug("Fetching subscription plan detail");

        let subscriptionPlanDetails: SubscriptionPlan = await this._subscriptionPlanService.getSubscriptionPlan(req.params.plan_type);

        return new SuccessResponse(ResponseMessages.TEST_SERVER_SUCCESS, subscriptionPlanDetails).send(res);
    }

}
