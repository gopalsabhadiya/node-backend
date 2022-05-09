import {Expose} from "class-transformer";

export default class MarketingNotificationUser{
    @Expose({name: 'id', toClassOnly: true})
    private readonly _id?: string;

    @Expose({name: 'userId'})
    private _userId: string;

    @Expose({name: 'marketingNotificationId'})
    private _marketingNotificationId: string;

    constructor( userId: string, marketingNotificationId: string, id?: string,) {
        this._id = id;
        this._userId = userId;
        this._marketingNotificationId = marketingNotificationId;
    }
    
    get id(): string {
        return <string>this._id;
    }

    get userId(): string {
        return this._userId;
    }

    set userId(value: string) {
        this._userId = value;
    }

    get marketingNotificationId(): string {
        return this._marketingNotificationId;
    }

    set marketingNotificationId(value: string) {
        this._marketingNotificationId = value;
    }
}
