import {ApiError, InternalError, NotFoundError} from "../errors/ApiError";
import {NextFunction, Request, Response} from "express";
import {environment} from "./Config";
import Logger from "../util/Logger";

export default class ErrorHandlerMiddlewares {
    static undefinedRoutesErrorMiddleware = async (req: Request, res: Response, next: NextFunction) => next(new NotFoundError());

    static errorHandlerMiddleware = async (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (err instanceof ApiError) {
            Logger.debug("API Error caught");
            ApiError.handle(err, res);
        } else {
            if (environment === 'development') {
                Logger.error(err);
                return res.status(500).send(err.message);
            }
            ApiError.handle(new InternalError(), res);
        }
    }


}
