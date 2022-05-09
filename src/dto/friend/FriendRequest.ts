import {Expose} from "class-transformer";
import {FriendRequestStatusEnum} from "../../util/enum/FriendRequestStatusEnum";

export default class FriendRequest {
    @Expose({name: 'id', toClassOnly: true})
    private readonly _id: number;

    @Expose({name: 'senderId'})
    private _senderId: string;

    @Expose({name: 'receiverId'})
    private _receiverId: string;

    @Expose({name: 'status'})
    private _status: FriendRequestStatusEnum;

    constructor(id: number, senderId: string, receiverId: string, status: FriendRequestStatusEnum) {
        this._id = id;
        this._senderId = senderId;
        this._receiverId = receiverId;
        this._status = status;
    }

    get id(): number {
        return this._id;
    }

    get senderId(): string {
        return this._senderId;
    }

    set senderId(value: string) {
        this._senderId = value;
    }

    get receiverId(): string {
        return this._receiverId;
    }

    set receiverId(value: string) {
        this._receiverId = value;
    }

    get status(): FriendRequestStatusEnum {
        return this._status;
    }

    set status(value: FriendRequestStatusEnum) {
        this._status = value;
    }
}
