import Joi from "@hapi/joi";
import ValidationRegex from "../../../../util/statics/ValidationRegex";
import {StoryTypeEnum} from "../../../../util/enum/StoryTypeEnum";

export default {
    register: Joi.object().keys({
        startTime: Joi.string().required(),
        endTime: Joi.string().required(),
        type:  Joi.required().valid(...Object.keys(StoryTypeEnum)),
    }),
    update: Joi.object().keys({
        startTime: Joi.string(),
        endTime: Joi.string(),
        type:  Joi.valid(...Object.keys(StoryTypeEnum)),
    }),
    requestParam: Joi.object().keys({
        id: Joi.string().required().regex(ValidationRegex.UUIDV4_REGEX),
    })
};
