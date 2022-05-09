import {Expose} from "class-transformer";
import MarketingEmailUser from "../marketing_email_user/MarketingEmailUser";

export default class MarketingEmail {
    @Expose({name: 'id', toClassOnly: true})
    private readonly _id: number;

    @Expose({name: 'title'})
    private _title: string;

    @Expose({name: 'description'})
    private _description: string;

    @Expose({name: 'link'})
    private _link: string;

    @Expose({name: 'hasImage'})
    private _hasImage: boolean;

    @Expose({name: 'users'})
    private _users: MarketingEmailUser[];

    constructor(id: number, title: string, description: string, link: string, hasImage: boolean, users: MarketingEmailUser[]) {
        this._id = id;
        this._title = title;
        this._description = description;
        this._link = link;
        this._hasImage = hasImage;
        this._users = users;
    }

    get id(): number {
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

    get hasImage(): boolean {
        return this._hasImage;
    }

    set hasImage(value: boolean) {
        this._hasImage = value;
    }

    get users(): MarketingEmailUser[] {
        return this._users;
    }

    set users(value: MarketingEmailUser[]) {
        this._users = value;
    }
}
