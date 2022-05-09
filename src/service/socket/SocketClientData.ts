export default class SocketClientData {
    private _userId: string;
    private _message: string;

    constructor(userId: string, message: string) {
        this._userId = userId;
        this._message = message;
    }

    get userId(): string {
        return this._userId;
    }

    set userId(value: string) {
        this._userId = value;
    }

    get message(): string {
        return this._message;
    }

    set message(value: string) {
        this._message = value;
    }
}