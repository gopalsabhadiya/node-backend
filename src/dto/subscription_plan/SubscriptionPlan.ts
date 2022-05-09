import {Expose} from "class-transformer";
import TermsAndCondition from "../tnc/TermsAndCondition";
import {SubscriptionPlanTypeEnum} from "../../util/enum/SubscriptionPlanTypeEnum";

export default class SubscriptionPlan {
    @Expose({name: 'id', toClassOnly: true})
    private readonly _id?: string;

    @Expose({name: 'description'})
    private _description: string;

    @Expose({name: 'type', })
    private _type: SubscriptionPlanTypeEnum;

    @Expose({name: 'termsAndCondition'})
    private _termsAndCondition?: TermsAndCondition[];


    constructor(id: string, description: string, type: SubscriptionPlanTypeEnum, termsAndCondition: TermsAndCondition[]) {
        this._id = id;
        this._description = description;
        this._type = type;
        this._termsAndCondition = termsAndCondition;
    }

    get id(): string {
        return <string>this._id;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get type(): SubscriptionPlanTypeEnum {
        return this._type;
    }

    set type(value: SubscriptionPlanTypeEnum) {
        this._type = value;
    }

    get termsAndCondition(): TermsAndCondition[] {
        return <TermsAndCondition[]>this._termsAndCondition;
    }

    set termsAndCondition(value: TermsAndCondition[]) {
        this._termsAndCondition = value;
    }
}
