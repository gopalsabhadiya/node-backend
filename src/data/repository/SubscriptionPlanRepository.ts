import Logger from "../../util/Logger";
import {autoInjectable} from "tsyringe";
import {NotFoundError} from "../../errors/ApiError";
import {plainToInstance} from "class-transformer";
import SubscriptionPlanEntity from "../models/entity/SubscriptionPlanEntity";
import ResponseMessages from "../../util/statics/ResponseMessages";
import SubscriptionPlan from "../../dto/subscription_plan/SubscriptionPlan";

@autoInjectable()
export default class SubscriptionPlanRepository {

    constructor() {
        Logger.debug("Initialising Subscription Plan repository");
    }

    //Fetch Queries
    public async getSubscriptionPlanDetails(type: string): Promise<SubscriptionPlan> {
        let subscriptionPlanEntity: SubscriptionPlanEntity | null = await SubscriptionPlanEntity.findOne({where: {type: type}});

        if (subscriptionPlanEntity == null) {
            throw new NotFoundError(ResponseMessages.SUBSCRIPTION_PLAN_NOT_ADDED);
        }

        return plainToInstance(SubscriptionPlan, subscriptionPlanEntity.get({plain: true}), {excludeExtraneousValues: true});
    }

    //Create Query

    //Update Query

    //Delete Query

}
