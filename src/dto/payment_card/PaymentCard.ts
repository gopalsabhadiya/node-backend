import {Expose} from "class-transformer";

export default class PaymentCard {
    @Expose({name: 'id', toClassOnly: true})
    private readonly _id?: string;

    @Expose({name: 'holderName'})
    private _holderName: string;

    @Expose({name: 'number'})
    private _number: string;

    @Expose({name: 'expiryInfo'})
    private _expiryInfo: string;

    constructor(id: string, holderName: string, number: string, expiryInfo: string) {
        this._id = id;
        this._holderName = holderName;
        this._number = number;
        this._expiryInfo = expiryInfo;
    }

    get id(): string {
        return <string>this._id;
    }

    get holderName(): string {
        return this._holderName;
    }

    set holderName(value: string) {
        this._holderName = value;
    }

    get number(): string {
        return this._number;
    }

    set number(value: string) {
        this._number = value;
    }

    get expiryInfo(): string {
        return this._expiryInfo;
    }

    set expiryInfo(value: string) {
        this._expiryInfo = value;
    }
}

