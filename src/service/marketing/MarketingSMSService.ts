import {autoInjectable} from "tsyringe";
import Logger from "../../util/Logger";
import MarketingSMSRepository from "../../data/repository/MarketingSMSRepository";
import {NotFoundError, UnImplementedError} from "../../errors/ApiError";
import ResponseMessages from "../../util/statics/ResponseMessages";
import User from "../../dto/user/User";
import UserRepository from "../../data/repository/UserRepository";
import MarketingSMS from "../../dto/marketing_sms/MarketingSMS";
import MarketingSMSUser from "../../dto/marketing_sms_user/MarketingSMSUser";

@autoInjectable()
export default class MarketingSMSService {
    private _marketingSMSRepository: MarketingSMSRepository;
    private _userRepository: UserRepository;

    constructor(marketingSMSRepository: MarketingSMSRepository, userRpository: UserRepository) {
        Logger.debug("Initialising Marketing SMS service");
        this._marketingSMSRepository = marketingSMSRepository;
        this._userRepository = userRpository;

    }

    public async addMarketingSMS(marketingSMS: MarketingSMS, userId: string): Promise<MarketingSMS> {
        marketingSMS = await this._marketingSMSRepository.addMarketingSMS(marketingSMS, userId);

        return marketingSMS;
    }

    public async updateMarketingSMS(marketingSMS: MarketingSMS, marketingSMSId: string, userId: string): Promise<MarketingSMS> {
        marketingSMS = await this._marketingSMSRepository.updateMarketingSMS(marketingSMS, marketingSMSId, userId);

        return marketingSMS;
    }

    public async deleteMarketingSMS(id: string, userId: string): Promise<void> {
        return this._marketingSMSRepository.deleteMarketingSMS(id, userId);
    }

    public async getAllMarketingSMS(userId: string): Promise<MarketingSMS[]> {
        return this._marketingSMSRepository.getAllMarketingSMS(userId);
    }

    public async getMarketingSMS(id: string, userId: string): Promise<MarketingSMS> {
        return this._marketingSMSRepository.getMarketingSMS(id, userId);
    }

    public async getMarketingSMSUsers(id: string, userId: string): Promise<MarketingSMSUser[]> {
        return this._marketingSMSRepository.getMarketingSMSUser(id, userId);
    }

    public async sendMarketingSMS(id: string, userId: string): Promise<void> {
        throw new UnImplementedError("Need to integrate SMS Service for SMS");
    }

}
