import {openEndpoints} from "../config/Config";
import {ProtectedRequest} from "./app-request";

export default class URLUtils {
    public static isProtectedURL(req: Request | ProtectedRequest): boolean {
        return !openEndpoints.includes(req.url);
    }
}
