import {Expose, Type} from "class-transformer";
import MarketingNotificationUser from "../marketing_notification_user/MarketingNotificationUser";
import MarketingNotificationStatus from "../marketing_notification_status/MarketingNotificationStatus";

export default class  MarketingNotification {
    @Expose({name: 'id', toClassOnly: true})
    private readonly _id: string;

    @Expose({name: 'title'})
    private _title: string;

    @Expose({name: 'description'})
    private _description: string;

    @Expose({name: 'link'})
    private _link: string;

    @Expose({name: 'hasImage'})
    private _hasImage: boolean;

    @Expose({name: 'notificationStatus'})
    @Type(()=> MarketingNotificationUser)
    private _notificationStatus: MarketingNotificationStatus[];

    @Expose({name: 'users'})
    @Type(()=> MarketingNotificationUser)
    private _users: MarketingNotificationUser[];

    constructor(id: string, title: string, description: string, link: string, hasImage: boolean, notificationStatus: MarketingNotificationStatus[], users: MarketingNotificationUser[]) {
        this._id = id;
        this._title = title;
        this._description = description;
        this._link = link;
        this._hasImage = hasImage;
        this._notificationStatus = notificationStatus;
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

    get hasImage(): boolean {
        return this._hasImage;
    }

    set hasImage(value: boolean) {
        this._hasImage = value;
    }

    get notificationStatus(): MarketingNotificationStatus[] {
        return this._notificationStatus;
    }

    set notificationStatus(value: MarketingNotificationStatus[]) {
        this._notificationStatus = value;
    }

    get users(): MarketingNotificationUser[] {
        return this._users;
    }

    set users(value: MarketingNotificationUser[]) {
        this._users = value;
    }
}
