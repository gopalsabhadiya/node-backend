import Joi from "@hapi/joi";
import {ProfileTypeEnum} from "../../../../../util/enum/ProfileTypeEnum";

export default {
    update: Joi.object().keys({
        type: Joi.string().required().valid(...Object.values(ProfileTypeEnum)),
    }),
};
