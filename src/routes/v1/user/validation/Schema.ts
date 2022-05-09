import Joi from "@hapi/joi";
import ValidationRegex from "../../../../util/statics/ValidationRegex";

export default {
    sendOTP: Joi.object().keys({
        contactNo: Joi.string().length(10).pattern(ValidationRegex.CONTACT_NO_REGEX).required(),
    }),
    verifyOTP: Joi.object().keys({
        otp: Joi.string().length(4).pattern(ValidationRegex.NUMBER_REGEX).required(),
    }),
};
