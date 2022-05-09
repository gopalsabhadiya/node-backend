import {Expose} from "class-transformer";
import {NotificationStatusEnum} from "../../util/enum/NotificationStatusEnum";

export default class MarketingNotificationStatus {

    @Expose({name: 'id', toClassOnly: true})
    private readonly _id: string;

    @Expose({name: 'status'})
    private _status: NotificationStatusEnum;

    @Expose({name: 'userId'})
    private _userId: string;

    @Expose({name: 'notificationId'})
    private _notificationId: string;

    constructor(id: string, status: NotificationStatusEnum, userId: string, notificationId: string) {
        this._id = id;
        this._status = status;
        this._userId = userId;
        this._notificationId = notificationId;
    }

    get id(): string {
        return this._id;
    }

    get status(): NotificationStatusEnum {
        return this._status;
    }

    set status(value: NotificationStatusEnum) {
        this._status = value;
    }

    get userId(): string {
        return this._userId;
    }

    set userId(value: string) {
        this._userId = value;
    }

    get notificationId(): string {
        return this._notificationId;
    }

    set notificationId(value: string) {
        this._notificationId = value;
    }
}
