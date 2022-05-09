import EmailConfig from "../../config/EmailConfig";
import {GMAIL_CONFIG} from "../../config/Config";
import Logger from "../../util/Logger";
import {autoInjectable} from "tsyringe";

@autoInjectable()
export default class EmailService {
    private emailConfig: EmailConfig;

    constructor(emailConfig: EmailConfig) {
        Logger.debug("Creating EmailService Instance")
        this.emailConfig = emailConfig;
    }

    public async sendEmail(to: string, subject: string, text: string, html?: string, headers?: any): Promise<boolean> {
        let response = await this.emailConfig.transporter.sendMail({
            from: GMAIL_CONFIG.user,
            to: to,
            subject: subject,
            text: text,
            html: html,
            headers: headers
        })
        Logger.debug("Mail sent");
        Logger.debug(response);
        return true;
    }
}