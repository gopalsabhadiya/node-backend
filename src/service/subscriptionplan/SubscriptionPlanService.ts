import {autoInjectable} from "tsyringe";
import Logger from "../../util/Logger";
import SubscriptionPlanRepository from "../../data/repository/SubscriptionPlanRepository";
import TermsAndConditionRepository from "../../data/repository/TermsAndConditionRepository";
import SubscriptionPlan from "../../dto/subscription_plan/SubscriptionPlan";

@autoInjectable()
export default class SubscriptionPlanService {
    private _subscriptionPlanRepository: SubscriptionPlanRepository;
    private _termsAndConditionRepository: TermsAndConditionRepository;

    constructor(subscriptionPlanRepository: SubscriptionPlanRepository, termsAndConditionRepository: TermsAndConditionRepository) {
        Logger.debug("Initialising Subscription plan service");
        this._subscriptionPlanRepository = subscriptionPlanRepository;
        this._termsAndConditionRepository = termsAndConditionRepository;
    }

    public async getSubscriptionPlan(type: string): Promise<SubscriptionPlan> {
        let subscriptionPlan: SubscriptionPlan = await this._subscriptionPlanRepository.getSubscriptionPlanDetails(type);
        subscriptionPlan.termsAndCondition = await this._termsAndConditionRepository.getTermsAndCondition("Subscription", type);
        return subscriptionPlan;
    }
}
