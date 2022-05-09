import Joi from "@hapi/joi";

export default {
    create: Joi.object().keys({
        holderName: Joi.string().max(30).required(),
        number: Joi.string().length(19).required(),
        expiryInfo: Joi.string().length(5).required()
    }),
};
