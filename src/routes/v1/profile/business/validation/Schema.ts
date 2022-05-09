import Joi from "@hapi/joi";
import ValidationRegex from "../../../../../util/statics/ValidationRegex";

export default {
    register: Joi.object().keys({
        name: Joi.string().required().max(30).pattern(ValidationRegex.STRING_WITH_SPACE_REGEX),
        category: Joi.string().required().max(30).pattern(ValidationRegex.STRING_WITH_SPACE_REGEX),
        subCategory: Joi.string().required().max(30).pattern(ValidationRegex.STRING_WITH_SPACE_REGEX),
        description: Joi.string().required().max(300),
        longitude: Joi.number().required(),
        latitude: Joi.number().required(),
        interestedCategory: Joi.string(),
        interestedSubCategory: Joi.string(),
    }),
    update: Joi.object().keys({
        name: Joi.string().max(30).pattern(ValidationRegex.STRING_WITH_SPACE_REGEX),
        category: Joi.string().max(30).pattern(ValidationRegex.STRING_WITH_SPACE_REGEX),
        subCategory: Joi.string().max(30).pattern(ValidationRegex.STRING_WITH_SPACE_REGEX),
        description: Joi.string().max(300),
        longitude: Joi.number(),
        latitude: Joi.number(),
        interestedCategory: Joi.string(),
        interestedSubCategory: Joi.string(),
    }),
};
