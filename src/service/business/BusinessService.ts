import {autoInjectable} from "tsyringe";
import Logger from "../../util/Logger";
import BusinessRepository from "../../data/repository/BusinessRepository";
import User from "../../dto/user/User";
import Business from "../../dto/business/Business";

@autoInjectable()
export default class BusinessService {
    private _repository: BusinessRepository;

    constructor(repository: BusinessRepository) {
        Logger.debug("Initialising Business service");
        this._repository = repository;
    }

    //Create
    public async registerUserBusinessProfile(business: Business, userId: string): Promise<Business> {
        return this._repository.registerUserBusiness(business, userId);
    }

    //Update
    public async updateBusinessProfile(business: Business, userId: string): Promise<Business> {
        return this._repository.updateBusinessProfile(business, userId);
    }

    //Delete
    public async deleteBusinessProfile(userId: string): Promise<void> {
        return this._repository.deleteBusinessProfile(userId);
    }

    //Fetch
    public async fetchBusinessProfile(userId: string): Promise<Business> {
        return this._repository.fetchBusinessProfile(userId);
    }
}
