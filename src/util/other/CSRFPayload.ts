export default class CSRFPayload {
    private _contactNo: string;

    constructor(contactNo: string) {
        this._contactNo = contactNo;
    }

    get contactNo(): string {
        return this._contactNo;
    }

    set contactNo(value: string) {
        this._contactNo = value;
    }
}
