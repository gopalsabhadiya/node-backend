import Joi from "@hapi/joi";

export default {
    authToken: Joi.object().keys({
        "auth-token": Joi.string().required(),
    }).unknown(true),
    // csrfToken: Joi.object().keys({
    //     "csrf-token": Joi.string().required(),
    // }).unknown(true),

};

