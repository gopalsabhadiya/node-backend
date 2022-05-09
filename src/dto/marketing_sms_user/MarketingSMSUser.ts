import {Expose} from "class-transformer";

export default class MarketingSMSUser {
    @Expose({name: 'id', toClassOnly: true})
    private readonly _id?: string;

    @Expose({name: 'contactNo'})
    private _contactNo: string;

    @Expose({name: 'marketingSMSId'})
    private _marketingSMSId: string;


    constructor(contactNo: string, marketingSMSId: string, id?: string) {
        this._id = id;
        this._contactNo = contactNo;
        this._marketingSMSId = marketingSMSId;
    }

    get id(): string {
        return <string>this._id;
    }

    get contactNo(): string {
        return this._contactNo;
    }

    set contactNo(value: string) {
        this._contactNo = value;
    }

    get marketingSMSId(): string {
        return this._marketingSMSId;
    }

    set marketingSMSId(value: string) {
        this._marketingSMSId = value;
    }
}
