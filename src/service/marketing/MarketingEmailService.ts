import {autoInjectable, delay, inject} from "tsyringe";
import Logger from "../../util/Logger";
import MarketingEmailRepository from "../../data/repository/MarketingEmailRepository";
import {UnImplementedError} from "../../errors/ApiError";
import UserRepository from "../../data/repository/UserRepository";
import MarketingEmailUser from "../../dto/marketing_email_user/MarketingEmailUser";
import MarketingEmail from "../../dto/marketing_email/MarketingEmail";
import EmailService from "../email/EmailService";
import BeanConfig from "../../config/BeanConfig";

@autoInjectable()
export default class MarketingEmailService {
    private _emailService: EmailService;
    private _marketingEmailRepository: MarketingEmailRepository;
    private _userRepository: UserRepository;

    constructor(@inject(delay(() => EmailService)) emailService: EmailService, marketingEmailRepository: MarketingEmailRepository, userRepository: UserRepository) {
        Logger.debug("Initialising Marketing Email service");
        this._emailService = emailService;
        this._marketingEmailRepository = marketingEmailRepository;
        this._userRepository = userRepository;
    }

    public async addMarketingEmail(marketingEmail: MarketingEmail, userId: string): Promise<MarketingEmail> {
        marketingEmail = await this._marketingEmailRepository.addMarketingEmail(marketingEmail, userId);

        return marketingEmail;
    }

    public async updateMarketingEmail(marketingEmail: MarketingEmail, marketingEmailId: string,  userId: string): Promise<MarketingEmail> {
        marketingEmail = await this._marketingEmailRepository.updateMarketingEmail(marketingEmail, marketingEmailId, userId);

        return marketingEmail;
    }

    public async deleteMarketingEmail(id: string, userId: string): Promise<void> {
        return this._marketingEmailRepository.deleteMarketingEmail(id, userId);
    }

    public async getAllMarketingEmail(userId: string): Promise<MarketingEmail[]> {
        return this._marketingEmailRepository.getAllMarketingEmail(userId);
    }

    public async getMarketingEmail(id: string, userId: string): Promise<MarketingEmail> {
        return this._marketingEmailRepository.getMarketingEmail(id, userId);
    }

    public async getMarketingEmailUsers(id: string, userId: string): Promise<MarketingEmailUser[]> {
        return this._marketingEmailRepository.getMarketingEmailUser(id, userId);

    }

    public async sendMarketingEmail(id: string, userId: string): Promise<void> {
        await this._emailService.sendEmail("jenish.scalelot@gmail.com", "Test", "Test");
        let marketingEmail: MarketingEmail = await this._marketingEmailRepository.getMarketingEmail(id, userId);
        let emailIds: string[] = marketingEmail.users.map(user => user.emailId);
        return;
    }

}
