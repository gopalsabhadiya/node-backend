import validator from "../util/validator";
import {ProtectedRequest} from "../util/app-request";
import {NextFunction, Response} from "express";
import Logger from "../util/Logger";
import {BadTokenError} from "../errors/ApiError";
import {openEndpoints} from "../config/Config";
import schema from "./validation/Schema";
import {ValidationSource} from "../util/enum/ValidationSourceEnum";
import JWT from "../config/JWT";
import SessionPayload from "../util/other/SessionPayload";
import UserService from "../service/user/UserService";
import {autoInjectable, container} from "tsyringe";
import URLUtils from "../util/URLUtils";
import ClientToServerEvents from "../service/socket/event/clienttoserver/ClientToServerEvents";
import {Socket} from "socket.io";
import ServerToClientEvents from "../service/socket/event/ServerToClientEvents";
import InterServerEvents from "../service/socket/event/InterServerEvents";
import SocketServerData from "../service/socket/SocketServerData";
import {ExtendedError} from "socket.io/dist/namespace";
import ResponseMessages from "../util/statics/ResponseMessages";
import User from "../dto/user/User";

@autoInjectable()
export default class AuthMiddleware {

    private _userService: UserService;

    constructor(userService: UserService) {
        this._userService = userService;
    }

    authMiddleware = [
        //Validate if Auth token is provided
        async (req: ProtectedRequest, res: Response, next: NextFunction) => {
            Logger.debug("Validating for auth token: " + req.url);
            if (!openEndpoints.includes(req.url)) {
                validator(schema.authToken, ValidationSource.HEADER)(req, res, next);
            } else {
                next();
            }
        },

        // //Validate if CSRF token is provided
        // async (req: ProtectedRequest, res: Response, next: NextFunction) => {
        //     Logger.debug("Validating for csrf token");
        //     if (!openEndpoints.includes(req.url)) {
        //         validator(schema.csrfToken, ValidationSource.HEADER)(req, res, next);
        //     } else {
        //         next();
        //     }
        // },
        //
        // //Validate CSRF token
        // async (req: ProtectedRequest, res: Response, next: NextFunction) => {
        //     Logger.debug("Validating CSRF Token");
        //     if (URLUtils.isProtectedURL(req)) {
        //         await JWT.decodeCSRFToken(req.header("csrf-token")!);
        //     }
        //     next();
        // },


        //Validate auth token and save payload in request
        async (req: ProtectedRequest, res: Response, next: NextFunction) => {
            Logger.debug("Validating Session token");
            try {
                if (URLUtils.isProtectedURL(req)) {
                    await JWT.validateSessionToken(req.header("auth-token") as string);
                    let sessionPayload: SessionPayload = await JWT.decodeSessionToken(req.header("auth-token")!);
                    req.accessToken = req.header("auth-token")!;
                    req.sessionPayload = sessionPayload;
                    Logger.debug(sessionPayload);
                }
                next();
            }catch(e) {
                next(new BadTokenError());
            }
        }
    ];

    public async socketMiddleware(socket: Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketServerData>, next: (err?: ExtendedError | undefined) => void) {
        Logger.debug("Socket initialisation");

        let userService: UserService = container.resolve(UserService);
        let authToken: string | string[] | undefined = socket.handshake.headers["auth-token"];

        if (authToken == undefined) {
            next(new BadTokenError(ResponseMessages.AUTH_TOKEN_MANDATORY));
        }

        if (Array.isArray(authToken)) {
            authToken = authToken[0];
        }

        Logger.debug("Validating Session token for socket connection");
        await JWT.validateSessionToken(authToken!);
        let sessionPayload: SessionPayload = await JWT.decodeSessionToken(authToken!);
        const user: User = await userService.getUserById(sessionPayload.userId);
        socket.data.userId = sessionPayload.userId;
        socket.data.name = user.fullName;
        Logger.debug(socket.data);
        next();
    };

}
