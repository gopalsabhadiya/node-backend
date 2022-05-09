import {autoInjectable} from "tsyringe";
import Logger from "../../util/Logger";
import ProductRepository from "../../data/repository/ProductRepository";
import Product from "../../dto/product/Product";
import PaymentCardRepository from "../../data/repository/PaymentCardRepository";
import PaymentCard from "../../dto/payment_card/PaymentCard";

@autoInjectable()
export default class PaymentService {
    private _repository: PaymentCardRepository;

    constructor(repository: PaymentCardRepository) {
        Logger.debug("Initialising Payment Card service");
        this._repository = repository;
    }

    public async addPaymentCard(paymentCard: PaymentCard, userId: string): Promise<PaymentCard> {
        return this._repository.addPaymentCard(paymentCard, userId);
    }

    public async getAllPaymentCards(userId: string): Promise<PaymentCard[]> {
        return this._repository.getAllPaymentCards(userId);
    }

    public async deletePaymentCards(id: string, userId: string): Promise<void> {
        return  this._repository.deletePaymentCard(id, userId);
    }
}
