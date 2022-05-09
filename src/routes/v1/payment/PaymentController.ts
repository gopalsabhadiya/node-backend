import express, {Router} from "express";
import asyncHandler from "../../../util/asyncHandler";
import validator from "../../../util/validator";
import schema from "./validation/Schema";
import {SuccessMsgResponse, SuccessResponse} from "../../../util/ApiResponse";
import ResponseMessages from "../../../util/statics/ResponseMessages";
import Logger from "../../../util/Logger";
import {autoInjectable} from "tsyringe";
import {ProtectedRequest} from "../../../util/app-request";
import {plainToInstance} from "class-transformer";
import PaymentService from "../../../service/payment/PaymentService";
import PaymentCard from "../../../dto/payment_card/PaymentCard";

@autoInjectable()
export default class PaymentController {
    private _router: Router;
    private _paymentService: PaymentService;

    constructor(paymentService: PaymentService) {
        Logger.debug("Initialising Payment Controller");
        this._router = express.Router();
        this._router.post('/', validator(schema.create), asyncHandler(async (req: ProtectedRequest, res) => this.addPaymentCard(req, res)));
        this._router.get('/', asyncHandler(async (req: ProtectedRequest, res) => this.getAllPaymentCard(req, res)));
        this._router.delete('/:id', asyncHandler(async (req: ProtectedRequest, res) => this.deletePaymentCard(req, res)));
        this._paymentService = paymentService;
    }

    routes() {
        Logger.debug("Configuring routes for Payment");
        return this._router;
    }

    private async addPaymentCard(req: ProtectedRequest, res: any) {
        Logger.debug("Adding Payment card for: " + req.sessionPayload.userId);

        let paymentCard: PaymentCard = plainToInstance(PaymentCard, req.body);
        paymentCard = await this._paymentService.addPaymentCard(paymentCard, req.sessionPayload.userId);

        Logger.debug("Payment card created successfully");

        return new SuccessResponse(ResponseMessages.CREATE_PRODUCT_SUCCESS, paymentCard).send(res);
    }

    private async getAllPaymentCard(req: ProtectedRequest, res: any) {
        Logger.debug("Fetching all Payment cards for: " + req.sessionPayload.userId);

        let paymentCardList: PaymentCard[] = await this._paymentService.getAllPaymentCards(req.sessionPayload.userId);

        Logger.debug("Payment card created successfully");

        return new SuccessResponse(ResponseMessages.CREATE_PRODUCT_SUCCESS, paymentCardList).send(res);
    }

    private async deletePaymentCard(req: ProtectedRequest, res: any) {
        Logger.debug("Payment cards deleting for: " + req.sessionPayload.userId);

        await this._paymentService.deletePaymentCards(req.params.id, req.sessionPayload.userId);

        Logger.debug("Payment card deleted successfully");

        return new SuccessMsgResponse(ResponseMessages.PAYMENT_DELETE_SUCCESS).send(res);
    }

}
