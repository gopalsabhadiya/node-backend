import {Expose} from "class-transformer";

export default class Product {
    @Expose({name: 'id', toClassOnly: true})
    private readonly _id?: string;

    @Expose({name: 'name'})
    private _name?: string;

    @Expose({name: 'price'})
    private _price?: number;

    @Expose({name: 'description'})
    private _description?: string;

    @Expose({name: 'offer'})
    private _offer?: string;

    @Expose({name: 'itemCode'})
    private _itemCode?: string;

    constructor(id: string, name: string, price: number, description: string, offer: string, itemCode: string) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._description = description;
        this._offer = offer;
        this._itemCode = itemCode;
    }

    get id(): string {
        return <string>this._id;
    }

    get name(): string {
        return <string>this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get price(): number {
        return <number>this._price;
    }

    set price(value: number) {
        this._price = value;
    }

    get description(): string {
        return <string>this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get offer(): string {
        return <string>this._offer;
    }

    set offer(value: string) {
        this._offer = value;
    }

    get itemCode(): string {
        // @ts-ignore
        return this._itemCode;
    }

    set itemCode(value: string) {
        this._itemCode = value;
    }
}
