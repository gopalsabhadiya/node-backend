import Joi from "@hapi/joi";
import ValidationRegex from "../../../../util/statics/ValidationRegex";

export default {
    create: Joi.object().keys({
        name: Joi.string().max(30).required(),
        price: Joi.number(),
        description: Joi.string(),
        offer: Joi.string(),
        itemCode: Joi.string()
    }),
    update: Joi.object().keys({
        name: Joi.string().max(30),
        price: Joi.number(),
        description: Joi.string(),
        offer: Joi.string(),
        itemCode: Joi.string()
    }),
};
