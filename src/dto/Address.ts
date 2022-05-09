import {Expose} from "class-transformer";
import Logger from "../util/Logger";

export class Address {
    @Expose({name: 'id', toClassOnly: true})
    private _id: number;

    @Expose({name: 'pinCode'})
    private _pinCode?: string;

    @Expose({name: 'city'})
    private _city?: string;

    @Expose({name: 'state'})
    private _state: string;

    @Expose({name: 'country'})
    private _country: string;

    @Expose({name: 'active'})
    private _active: boolean;

    constructor(id: number, state: string, country: string, active: boolean, pinCode?: string, city?: string) {
        this._id = id;
        this._pinCode = pinCode;
        this._city = city;
        this._state = state;
        this._country = country;
        this._active = active;
    }

    get pinCode(): string {
        return <string>this._pinCode;
    }

    set pinCode(value: string) {
        Logger.debug("Pincode setter called");
        this._pinCode = value;
    }

    get city(): string {
        return <string>this._city;
    }

    set city(value: string) {
        this._city = value;
    }

    get state(): string {
        return this._state;
    }

    set state(value: string) {
        this._state = value;
    }

    get country(): string {
        return this._country;
    }

    set country(value: string) {
        this._country = value;
    }

    get active(): boolean {
        return this._active;
    }

    set active(value: boolean) {
        this._active = value;
    }
}
