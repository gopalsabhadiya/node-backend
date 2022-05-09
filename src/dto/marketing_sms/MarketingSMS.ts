import {Expose} from "class-transformer";
import MarketingSMSUser from "../marketing_sms_user/MarketingSMSUser";

export default class MarketingSMS {

    @Expose({name: 'id', toClassOnly: true})
    private readonly _id: string;

    @Expose({name: 'title'})
    private _title: string;

    @Expose({name: 'description'})
    private _description: string;

    @Expose({name:'link'})
    private _link: string;

    @Expose({name: 'hasImage'})
    private _hasImage: string;

    @Expose({name: 'users'})
    private _users: MarketingSMSUser[];


    constructor(id: string, title: string, description: string, link: string, hasImage: string, users: MarketingSMSUser[]) {
        this._id = id;
        this._title = title;
        this._description = description;
        this._link = link;
        this._hasImage = hasImage;
        this._users = users;
    }

    get id(): string {
        return this._id;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get link(): string {
        return this._link;
    }

    set link(value: string) {
        this._link = value;
    }

    get hasImage(): string {
        return this._hasImage;
    }

    set hasImage(value: string) {
        this._hasImage = value;
    }

    get users(): MarketingSMSUser[] {
        return this._users;
    }

    set users(value: MarketingSMSUser[]) {
        this._users = value;
    }
}
