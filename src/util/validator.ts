import Joi from '@hapi/joi';
import {NextFunction, Request, Response} from 'express';
import Logger from './Logger';
import {BadRequestError} from '../errors/ApiError';
import {ValidationSource} from "./enum/ValidationSourceEnum";

export default (schema: Joi.ObjectSchema, source: ValidationSource = ValidationSource.BODY) => (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        Logger.debug("Trying to validate: " + JSON.stringify(req[source]));
        const {error} = schema.validate(req[source]);
        Logger.debug("Schema validated for: " + source);

        if (!error) return next();

        const {details} = error;
        const message = details.map((i) => i.message.replace(/['"]+/g, '')).join(',');
        Logger.debug("Validation successful");

        next(new BadRequestError(message));
    } catch (error: any) {
        next(error);
    }
};
