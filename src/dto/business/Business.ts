import {Expose} from "class-transformer";

export default class Business {
    @Expose({name: 'id', toClassOnly: true})
    private readonly _id: number;

    @Expose({name: 'name'})
    private _name: string;

    @Expose({name: 'category'})
    private _category: string;

    @Expose({name: 'subCategory'})
    private _subCategory?: string;

    @Expose({name: 'description'})
    private _description: string;

    @Expose({name: 'longitude'})
    private _longitude?: number;

    @Expose({name: 'latitude'})
    private _latitude?: number;

    @Expose({name: "interestedCategory"})
    private _interestedCategory?: string;

    @Expose({name: "interestedSubCategory"})
    private _interestedSubCategory?: string;

    @Expose({name: 'active'})
    private _active: boolean;

    constructor(id: number, name: string, category: string, subCategory: string, description: string, longitude: number, latitude: number, interestedCategory: string, interestedSubCategory: string, active: boolean) {
        this._id = id;
        this._name = name;
        this._category = category;
        this._subCategory = subCategory;
        this._description = description;
        this._longitude = longitude;
        this._latitude = latitude;
        this._interestedCategory = interestedCategory;
        this._interestedSubCategory = interestedSubCategory;
        this._active = active;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get category(): string {
        return this._category;
    }

    set category(value: string) {
        this._category = value;
    }

    get subCategory(): string {
        return <string>this._subCategory;
    }

    set subCategory(value: string) {
        this._subCategory = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get longitude(): number {
        return <number>this._longitude;
    }

    set longitude(value: number) {
        this._longitude = value;
    }

    get latitude(): number {
        return <number>this._latitude;
    }

    set latitude(value: number) {
        this._latitude = value;
    }

    get active(): boolean {
        return this._active;
    }

    get interestedCategory(): string {
        return <string>this._interestedCategory;
    }

    set interestedCategory(value: string) {
        this._interestedCategory = value;
    }

    get interestedSubCategory(): string {
        return <string>this._interestedSubCategory;
    }

    set interestedSubCategory(value: string) {
        this._interestedSubCategory = value;
    }

    set active(value: boolean) {
        this._active = value;
    }

}
