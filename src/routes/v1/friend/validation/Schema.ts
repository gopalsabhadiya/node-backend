import Joi from "@hapi/joi";
import ValidationRegex from "../../../../util/statics/ValidationRegex";
import {FriendRequestStatusEnum} from "../../../../util/enum/FriendRequestStatusEnum";

export default {
    create: Joi.object().keys({
        receiverId: Joi.string().regex(ValidationRegex.UUIDV4_REGEX).required(),
        status: Joi.string().valid(...Object.keys(FriendRequestStatusEnum)).required(),
    }),
    update: Joi.object().keys({
        receiverId: Joi.string().regex(ValidationRegex.UUIDV4_REGEX).required(),
        status: Joi.string().valid(...Object.keys(FriendRequestStatusEnum)).required(),
    }),
    requestParam: Joi.object().keys({
        id: Joi.string().required().regex(ValidationRegex.UUIDV4_REGEX),
    })
};
