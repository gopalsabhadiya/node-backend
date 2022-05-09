import SessionPayload from "./other/SessionPayload";
import CSRFPayload from "./other/CSRFPayload";
import JWT from "../config/JWT";
import Logger from "./Logger";

export default class JWTUtil {

    static async generateJWTSessionToken(payload: SessionPayload): Promise<string> {
        Logger.debug("Creating Session Token");
        let token = await JWT.encode(
            payload
        );
        Logger.debug("Token created:" + token);
        return token;
    }

    static async generateJWTCSRFToken(payload: CSRFPayload): Promise<string> {
        Logger.debug("Creating CSRF Token");
        let token = await JWT.encode(
            payload
        );
        Logger.debug("Token created:" + token);
        return token;
    }

    static decodeJWTSessionToken(token: string): SessionPayload {
        return new SessionPayload("hello");
    }

    static decodeJWTCSRFToken(token: string): CSRFPayload {

        return new CSRFPayload("hello");
    }

}
