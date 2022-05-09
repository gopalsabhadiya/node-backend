import Joi from "@hapi/joi";
import ValidationRegex from "../../../../../util/statics/ValidationRegex";
import {GenderEnum} from "../../../../../util/enum/GenderEnum";

export default {
    register: Joi.object().keys({
        contactNo: Joi.string().pattern(ValidationRegex.CONTACT_NO_REGEX),
        fullName: Joi.string().required().max(30).pattern(ValidationRegex.STRING_WITH_SPACE_REGEX),
        userName: Joi.string().required().max(30).pattern(ValidationRegex.USER_NAME_REGEX),
        emailId: Joi.string().required().email(),
        nickName: Joi.string().max(30).pattern(ValidationRegex.STRING_WITH_SPACE_REGEX),
        longitude: Joi.number(),
        latitude: Joi.number(),
        areaRange: Joi.number(),
        gender: Joi.valid(...Object.keys(GenderEnum)),
        targetAudienceAgeMin: Joi.number(),
        targetAudienceAgeMax: Joi.number(),
        isBusinessProfileRegistered: Joi.boolean(),
        isPersonalProfileRegistered: Joi.boolean(),
        facebookLink: Joi.string().optional(),
        instagramLink: Joi.string().optional(),
        twitterLink: Joi.string().optional(),
        linkedinLink: Joi.string().optional(),
    }),

    update: Joi.object().keys({
        contactNo: Joi.string().pattern(ValidationRegex.CONTACT_NO_REGEX),
        fullName: Joi.string().max(30).pattern(ValidationRegex.STRING_WITH_SPACE_REGEX),
        userName: Joi.string().max(30).pattern(ValidationRegex.USER_NAME_REGEX),
        emailId: Joi.string().email(),
        nickName: Joi.string().max(30).pattern(ValidationRegex.STRING_WITH_SPACE_REGEX),
        longitude: Joi.number(),
        latitude: Joi.number(),
        areaRange: Joi.number(),
        gender: Joi.valid(...Object.keys(GenderEnum)),
        targetAudienceAgeMin: Joi.number(),
        targetAudienceAgeMax: Joi.number(),
        isBusinessProfileRegistered: Joi.boolean(),
        isPersonalProfileRegistered: Joi.boolean(),
        facebookLink: Joi.string().optional(),
        instagramLink: Joi.string().optional(),
        twitterLink: Joi.string().optional(),
        linkedinLink: Joi.string().optional(),
    }),
};
