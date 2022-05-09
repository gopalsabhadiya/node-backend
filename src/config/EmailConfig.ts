import {GMAIL_CONFIG} from "./Config";
import {autoInjectable} from "tsyringe";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import {Transporter} from "nodemailer";
import Logger from "../util/Logger";

@autoInjectable()
export default class EmailConfig {
    private service: string = GMAIL_CONFIG.service;
    private user: string = GMAIL_CONFIG.user;
    private password: string = GMAIL_CONFIG.password;
    private _transporter: Transporter<SMTPTransport.SentMessageInfo>;

    constructor() {
        Logger.debug("Creating EmailConfig Instance")
        const nodemailer = require("nodemailer");
        this._transporter = nodemailer.createTransport({
            // host: this.host,
            // port: this.port,
            // secure: this.secure,
            // requireTLS: this.requireTLS,
            service: this.service,
            auth: {
                user: this.user,
                pass: this.password,
            },
            logger: true
        });
    }

    get transporter(): Transporter<SMTPTransport.SentMessageInfo> {
        return this._transporter;
    }
}