import {Expose, Transform, Type} from "class-transformer";
import {StoryTypeEnum} from "../../util/enum/StoryTypeEnum";
import Logger from "../../util/Logger";

export default class Story {

    @Expose({name: 'id', toClassOnly: true})
    private readonly _id?: string;

    @Expose({name: 'type'})
    private _type?: StoryTypeEnum;

    @Expose({name: 'startTime'})
    private _startTime?: Date;

    @Expose({name: 'endTime'})
    private _endTime?: Date;

    @Expose({name: 'viewCount'})
    private _viewCount?: number;

    @Expose({name: 'active'})
    private _active?: boolean;

    constructor(id: string, type: StoryTypeEnum, startTime: Date, endTime: Date, viewCount: number, active: boolean) {
        this._id = id;
        this._type = type;
        this._startTime = startTime;
        this._endTime = endTime;
        this._viewCount = viewCount;
        this._active = active;
    }

    get id(): string {
        return <string>this._id;
    }

    get type(): StoryTypeEnum {
        return <StoryTypeEnum>this._type;
    }

    set type(value: StoryTypeEnum) {
        this._type = value;
    }

    get startTime(): Date {
        return <Date>this._startTime;
    }

    set startTime(value: Date) {
        this._startTime = value;
    }

    get endTime(): Date {
        return <Date>this._endTime;
    }

    set endTime(value: Date) {
        this._endTime = value;
    }

    get viewCount(): number {
        return <number>this._viewCount;
    }

    set viewCount(value: number) {
        this._viewCount = value;
    }

    get active(): boolean {
        return <boolean>this._active;
    }

    set active(value: boolean) {
        this._active = value;
    }
}
