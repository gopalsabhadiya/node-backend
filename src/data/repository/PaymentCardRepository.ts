import Logger from "../../util/Logger";
import {autoInjectable} from "tsyringe";
import PaymentCard from "../../dto/payment_card/PaymentCard";
import {NotFoundError} from "../../errors/ApiError";
import UserEntity from "../models/entity/UserEntity";
import ResponseMessages from "../../util/statics/ResponseMessages";
import AppUtils from "../../util/AppUtils";
import {instanceToPlain, plainToInstance} from "class-transformer";
import PaymentCardEntity from "../models/entity/PaymentCardEntity";
import BusinessEntity from "../models/entity/BusinessEntity";
import ProductEntity from "../models/entity/ProductEntity";
import {InternalErrorResponse} from "../../util/ApiResponse";

@autoInjectable()
export default class PaymentCardRepository {

    constructor() {
        Logger.debug("Initialising Payment Card repository");
    }

    //Fetch Queries
    public async getAllPaymentCards(userId: string): Promise<PaymentCard[]> {
        let userEntity = await UserEntity.findByPk(userId,{include:[{model: PaymentCardEntity, as: "paymentCard"}], attributes: ['id']});

        if (userEntity == null) {
            throw new NotFoundError(ResponseMessages.USER_WITH_ID_NOT_FOUND + userId);
        }

        if(userEntity.paymentCard == null) {
            throw new NotFoundError(ResponseMessages.PAYMENT_CARD_NOT_ADDED)
        }

        return userEntity.paymentCard.map(card => plainToInstance(PaymentCard, card.get({plain: true})));
    }

    //Create Query
    public async addPaymentCard(paymentCard: PaymentCard, userId: string): Promise<PaymentCard> {
        let paymentCardEntity: PaymentCardEntity;
        let userEntity = await UserEntity.findByPk(userId);

        if (userEntity == null) {
            throw new NotFoundError(ResponseMessages.USER_WITH_ID_NOT_FOUND + userId);
        }

        // paymentCardEntity = await userEntity.createPaymentCard(AppUtils.nullPropsRemover(instanceToPlain(paymentCard)));

        try {
            paymentCardEntity = await userEntity.createPaymentCard(AppUtils.nullPropsRemover(instanceToPlain(paymentCard)));
        } catch (e: any) {
            Logger.error(e.stack);
            throw e;
        }

        return plainToInstance(PaymentCard, paymentCardEntity.get({plain: true}), {excludeExtraneousValues: true});
    }

    //Update Query

    //Delete Query
    public async deletePaymentCard(id: string, userId: string): Promise<void> {
        Logger.debug(id + " : " + userId)
        try {
            let result: [affectedCount: number] = await PaymentCardEntity.update({active: false}, {
                where: {
                    id: id,
                    user_id: userId,
                    active: true
                }
            });
            if (!result[0]) {
                throw new NotFoundError(ResponseMessages.PRODUCTS_NOT_FOUND + id);
            }
        } catch (e: any) {
            Logger.debug(e.message);
            if (e instanceof NotFoundError) {
                throw e;
            }
            throw new InternalErrorResponse();
        }

    }
}
