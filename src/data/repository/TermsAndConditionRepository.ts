import Logger from "../../util/Logger";
import {autoInjectable} from "tsyringe";
import {NotFoundError} from "../../errors/ApiError";
import {plainToInstance} from "class-transformer";
import TermsAndCondition from "../../dto/tnc/TermsAndCondition";
import ResponseMessages from "../../util/statics/ResponseMessages";
import TNCEntity from "../models/entity/TNCEntity";

@autoInjectable()
export default class TermsAndConditionRepository {

    constructor() {
        Logger.debug("Initialising Terms and Condition repository");
    }

    //Fetch Queries
    public async getTermsAndCondition(type: string, subType?: string): Promise<TermsAndCondition[]> {
        let tncEntityList: TNCEntity[] | null = await TNCEntity.findAll({where: {type: type, sub_type: subType}});

        if (tncEntityList == null) {
            throw new NotFoundError(ResponseMessages.TNC_NOT_ADDED);
        }

        return tncEntityList.map(tncEntity => plainToInstance(TermsAndCondition, tncEntity.get({plain: true}), {excludeExtraneousValues: true}));
    }

    //Create Query

    //Update Query

    //Delete Query
}
