import Joi from "@hapi/joi";
import ValidationRegex from "../../../../util/statics/ValidationRegex";

export default {
    //ToDo: writing strict rules
    create: Joi.object().keys({
        title: Joi.string().max(30).required(),
        description: Joi.string().max(350),
        link: Joi.string().max(100),
        hasImage: Joi.boolean().required(),
        users: Joi.array().items({
            userId: Joi.string().regex(ValidationRegex.UUIDV4_REGEX).required()
        }).min(1).required(),
    }),
    update: Joi.object().keys({
        title: Joi.string().max(30),
        description: Joi.string().max(350),
        link: Joi.string().max(100),
        hasImage: Joi.boolean(),
        users: Joi.array().items({
            // id: Joi.string().required().regex(ValidationRegex.UUIDV4_REGEX),
            userId: Joi.string().regex(ValidationRegex.UUIDV4_REGEX).required()
        }).min(1),
    }),
    requestParam: Joi.object().keys({
        id: Joi.string().required().regex(ValidationRegex.UUIDV4_REGEX),
    })
};
