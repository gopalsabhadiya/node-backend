import {Expose} from "class-transformer";
import Business from "../business/Business";
import {GenderEnum} from "../../util/enum/GenderEnum";

export default class User {
    @Expose({name: 'id', toClassOnly: true})
    private readonly _id?: string;

    @Expose({name: 'contactNo'})
    private _contactNo: string;

    @Expose({name: 'fullName'})
    private _fullName?: string;

    @Expose({name: 'userName'})
    private _userName?: string;

    @Expose({name: 'emailId'})
    private _emailId?: string;

    @Expose({name: 'nickName'})
    private _nickName?: string;

    @Expose({name: 'longitude'})
    private _longitude?: number;

    @Expose({name: 'latitude'})
    private _latitude?: number;

    @Expose({name: 'business'})
    private _business?: Business;

    @Expose({name: 'areaRange'})
    private _areaRange?: number;

    @Expose({name: 'gender'})
    private _gender?: GenderEnum;

    @Expose({name: 'targetAudienceAgeMin'})
    private _targetAudienceAgeMin?: number;

    @Expose({name: 'targetAudienceAgeMax'})
    private _targetAudienceAgeMax?: number;

    @Expose({name: 'isBusinessProfileRegistered'})
    private _isBusinessProfileRegistered?: boolean;

    @Expose({name: 'isPersonalProfileRegistered'})
    private _isPersonalProfileRegistered?: boolean;

    @Expose({name: 'active'})
    private _active?: boolean;

    @Expose({name: 'facebookLink'})
    private _facebookLink?: string;

    @Expose({name: 'instagramLink'})
    private _instagramLink?: string;

    @Expose({name: 'twitterLink'})
    private _twitterLink?: string;

    @Expose({name: 'linkedinLink'})
    private _linkedinLink?: string;

    constructor(id: string, contactNo: string, fullName: string, userName: string, emailId: string, nickName: string, longitude: number, latitude: number, business: Business, areaRange: number, gender: GenderEnum, targetAudienceAgeMin: number, targetAudienceAgeMax: number, isBusinessProfileRegistered: boolean, isPersonalProfileRegistered: boolean, active: boolean, facebookLink: string, instagramLink: string, twitterLink: string, linkedinLink: string) {
        this._id = id;
        this._contactNo = contactNo;
        this._fullName = fullName;
        this._userName = userName;
        this._emailId = emailId;
        this._nickName = nickName;
        this._longitude = longitude;
        this._latitude = latitude;
        this._business = business;
        this._areaRange = areaRange;
        this._gender = gender;
        this._targetAudienceAgeMin = targetAudienceAgeMin;
        this._targetAudienceAgeMax = targetAudienceAgeMax;
        this._isBusinessProfileRegistered = isBusinessProfileRegistered;
        this._isPersonalProfileRegistered = isPersonalProfileRegistered;
        this._active = active;
        this._facebookLink = facebookLink;
        this._instagramLink = instagramLink;
        this._twitterLink = twitterLink;
        this._linkedinLink = linkedinLink;
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

    get fullName(): string {
        return <string>this._fullName;
    }

    set fullName(value: string) {
        this._fullName = value;
    }

    get userName(): string {
        return <string>this._userName;
    }

    set userName(value: string) {
        this._userName = value;
    }

    get emailId(): string {
        return <string>this._emailId;
    }

    set emailId(value: string) {
        this._emailId = value;
    }

    get nickName(): string {
        return <string>this._nickName;
    }

    set nickName(value: string) {
        this._nickName = value;
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

    get business(): Business {
        return <Business>this._business;
    }

    set business(value: Business) {
        this._business = value;
    }

    get areaRange(): number {
        return <number>this._areaRange;
    }

    set areaRange(value: number) {
        this._areaRange = value;
    }

    get gender(): GenderEnum {
        return <GenderEnum>this._gender;
    }

    set gender(value: GenderEnum) {
        this._gender = value;
    }

    get targetAudienceAgeMin(): number {
        return <number>this._targetAudienceAgeMin;
    }

    set targetAudienceAgeMin(value: number) {
        this._targetAudienceAgeMin = value;
    }

    get targetAudienceAgeMax(): number {
        return <number>this._targetAudienceAgeMax;
    }

    set targetAudienceAgeMax(value: number) {
        this._targetAudienceAgeMax = value;
    }

    get isBusinessProfileRegistered(): boolean {
        return <boolean>this._isBusinessProfileRegistered;
    }

    set isBusinessProfileRegistered(value: boolean) {
        this._isBusinessProfileRegistered = value;
    }

    get isPersonalProfileRegistered(): boolean {
        return <boolean>this._isPersonalProfileRegistered;
    }

    set isPersonalProfileRegistered(value: boolean) {
        this._isPersonalProfileRegistered = value;
    }

    get facebookLink(): string {
        return <string>this._facebookLink;
    }

    set facebookLink(value: string) {
        this._facebookLink = value;
    }

    get instagramLink(): string {
        return <string>this._instagramLink;
    }

    set instagramLink(value: string) {
        this._instagramLink = value;
    }

    get twitterLink(): string {
        return <string>this._twitterLink;
    }

    set twitterLink(value: string) {
        this._twitterLink = value;
    }

    get linkedinLink(): string {
        return <string>this._linkedinLink;
    }

    set linkedinLink(value: string) {
        this._linkedinLink = value;
    }

    get active(): boolean {
        return <boolean>this._active;
    }

    set active(value: boolean) {
        this._active = value;
    }
}
