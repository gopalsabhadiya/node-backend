import {Expose} from "class-transformer";

export default class MarketingEmailUser {

    @Expose({name: 'id', toClassOnly: true})
    private readonly _id?: string;

    @Expose({name: 'emailId'})
    private _emailId: string;

    @Expose({name: 'marketingEmailId'})
    private _marketingEmailId: string;

    constructor(emailId: string, marketingEmailId: string, id?: string) {
        this._id = id;
        this._emailId = emailId;
        this._marketingEmailId = marketingEmailId;
    }

    get id(): string {
        return <string>this._id;
    }

    get emailId(): string {
        return this._emailId;
    }

    set emailId(value: string) {
        this._emailId = value;
    }

    get marketingEmailId(): string {
        return this._marketingEmailId;
    }

    set marketingEmailId(value: string) {
        this._marketingEmailId = value;
    }
}
