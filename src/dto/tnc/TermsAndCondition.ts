import {Expose} from "class-transformer";

export default class TermsAndCondition {
    @Expose({name: 'id', toClassOnly: true})
    private readonly _id?: string;

    @Expose({name: 'type'})
    private _type: string;

    @Expose({name: 'subType'})
    private _subType?: string;

    @Expose({name: 'description'})
    private _description: string;

    @Expose({name: 'order'})
    private _order: number;

    constructor(id: string, type: string, subType: string, description: string, order: number) {
        this._id = id;
        this._type = type;
        this._subType = subType;
        this._description = description;
        this._order = order;
    }

    get id(): string {
        return <string>this._id;
    }

    get type(): string {
        return this._type;
    }

    set type(value: string) {
        this._type = value;
    }

    get subType(): string {
        return <string>this._subType;
    }

    set subType(value: string) {
        this._subType = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get order(): number {
        return this._order;
    }

    set order(value: number) {
        this._order = value;
    }
}
