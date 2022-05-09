import Joi from "@hapi/joi";

export default {
    testPayload: Joi.object().keys({
        testString: Joi.string().max(50).required(),
    }),
};
