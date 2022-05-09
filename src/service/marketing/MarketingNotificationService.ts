import {autoInjectable} from "tsyringe";
import Logger from "../../util/Logger";
import MarketingNotificationRepository from "../../data/repository/MarketingNotificationRepository";
import MarketingNotification from "../../dto/marketing_notification/MarketingNotification";
import {NotFoundError, UnImplementedError} from "../../errors/ApiError";
import UserRepository from "../../data/repository/UserRepository";
import ResponseMessages from "../../util/statics/ResponseMessages";
import User from "../../dto/user/User";

@autoInjectable()
export default class MarketingNotificationService {
    private _marketingNotificationRepository: MarketingNotificationRepository;
    private _userRepository: UserRepository;

    constructor(marketingNotificationRepository: MarketingNotificationRepository, userRepository: UserRepository) {
        Logger.debug("Initialising Marketing Notification service");
        this._marketingNotificationRepository = marketingNotificationRepository;
        this._userRepository = userRepository;
    }

    public async addMarketingNotification(marketingNotification: MarketingNotification, userId: string): Promise<MarketingNotification> {
        let allUsersExist = await this._userRepository.checkIfUserListExists(marketingNotification.users.map(user => user.userId));
        if(!allUsersExist) {
            throw new NotFoundError(ResponseMessages.ONE_OR_MORE_USER_IN_LIST_ABSENT);
        }

        marketingNotification = await this._marketingNotificationRepository.addMarketingNotification(marketingNotification, userId);

        return marketingNotification;
    }

    public async updateMarketingNotification(marketingNotification: MarketingNotification, marketingNotificationId: string,  userId: string): Promise<MarketingNotification> {
        if (marketingNotification.users != null && marketingNotification.users.length != 0) {
            let allUsersExist = await this._userRepository.checkIfUserListExists(marketingNotification.users.map(user => user.userId));
            if (!allUsersExist) {
                throw new NotFoundError(ResponseMessages.ONE_OR_MORE_USER_IN_LIST_ABSENT);
            }
        }

        marketingNotification = await this._marketingNotificationRepository.updateMarketingNotification(marketingNotification, marketingNotificationId, userId);

        return marketingNotification;
    }

    public async deleteMarketingNotification(id: string, userId: string): Promise<void> {
        return this._marketingNotificationRepository.deleteMarketingNotification(id, userId);
    }

    public async getAllMarketingNotifications(userId: string): Promise<MarketingNotification[]> {
        return this._marketingNotificationRepository.getAllMarketingNotifications(userId);
    }

    public async getMarketingNotification(id: string, userId: string): Promise<MarketingNotification> {
        return this._marketingNotificationRepository.getMarketingNotification(id, userId);
    }

    public async getMarketingNotificationUsers(id: string, userId: string): Promise<User[]> {
        let userIds: string[] = await this._marketingNotificationRepository.getMarketingNotificationUserIds(id, userId);
        return this._userRepository.getAllUsersById(userIds);

    }

    public async sendMarketingNotification(id: string, userId: string): Promise<void> {
        throw new UnImplementedError("Need to integrate firebase for notification");
    }
}
