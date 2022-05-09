import {Request} from 'express';
import SessionPayload from "./other/SessionPayload";

declare interface ProtectedRequest extends Request {
    sessionPayload: SessionPayload,
    accessToken: string;
}

declare interface Tokens {
    accessToken: string;
    refreshToken: string;
}
