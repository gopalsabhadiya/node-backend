import express, {Router} from "express";
import asyncHandler from "../../../util/asyncHandler";
import validator from "../../../util/validator";
import schema from "./validation/Schema";
import {FailureMsgResponse, SuccessMsgResponse, SuccessResponse} from "../../../util/ApiResponse";
import ResponseMessages from "../../../util/statics/ResponseMessages";
import Logger from "../../../util/Logger";
import User from "../../../dto/user/User";
import {autoInjectable, delay, inject} from "tsyringe";
import UserService from "../../../service/user/UserService"
import JWTUtil from "../../../util/JWTUtil";
import SessionPayload from "../../../util/other/SessionPayload";
import {ProtectedRequest} from "../../../util/app-request";
import {instanceToPlain} from "class-transformer";
import BeanConfig from "../../../config/BeanConfig";
import {TWILIO} from "../../../config/Config";

@autoInjectable()
export default class RegisterUserController {
    private _router: Router;
    private _userService: UserService;
    private beanConfig: BeanConfig;

    constructor(userService: UserService, @inject(delay(() => BeanConfig)) beanConfig: BeanConfig) {
        Logger.debug("Initialising Register User Controller");
        this._router = express.Router();
        this._userService = userService;
        this.beanConfig = beanConfig;
    }

    routes() {
        // Logger.debug("Configuring routes for User Registration");
        this._router.post('/send-otp', validator(schema.sendOTP), asyncHandler(async (req, res) => this.sendOTPController(req, res)));
        this._router.post('/verify-otp', validator(schema.verifyOTP), asyncHandler(async (req: ProtectedRequest, res) => this.verifyOTPController(req, res)));
        this._router.post('/otp-status', asyncHandler(async (req: ProtectedRequest, res) => this.otpStatus(req, res)));
        return this._router;
    }

    private async sendOTPController(req: any, res: any) {
        let otp: number = Math.floor(1000 + Math.random() * 9000);

        Logger.debug("Sending OTP: " + otp.toString());

        let userId: string | null = await this._userService.getUserIdByContactNo(req.body.contactNo);
        Logger.debug("User Exists: " + userId);

        //ToDo: send otp to contact number
        await this.beanConfig.twilioClient.messages.create({
            from: TWILIO.phoneNumber,
            to: "+918780343513",
            body: "Your OTP: " + otp.toString()
        })
        .then((message) => Logger.debug(message));

        let sessionToken: string = await JWTUtil.generateJWTSessionToken(new SessionPayload(req.body.contactNo, userId ?? undefined, otp.toString(), userId == null));
        // let csrfToken: string = await JWTUtil.generateJWTCSRFToken(new CSRFPayload(req.body.contactNo));

        // res.setHeader("auth-token", sessionToken, {
        //     // secure: true,
        //     httpOnly: true
        // });
        // res.setHeader("csrf-token", csrfToken);
        return new SuccessResponse(ResponseMessages.SEND_OTP_SUCCESS, {/*csrfToken: csrfToken,*/
            authToken: sessionToken
        }).send(res);
    }

    private async verifyOTPController(req: ProtectedRequest, res: any) {
        Logger.debug("Verifying OTP");

        if ("1234"/*req.sessionPayload.otp*/ == req.body.otp) {
            let user: User;

            if (req.sessionPayload.newUser) {
                Logger.debug("Registering new user with contact no");
                user = await this._userService.registerUserWithContactNo(req.sessionPayload.contactNo);
            } else {
                Logger.debug("Serving old user");
                user = await this._userService.getUserById(req.sessionPayload.userId);
            }

            let sessionToken: string = await JWTUtil.generateJWTSessionToken(new SessionPayload(user.contactNo, user.id, undefined, false));
            // let csrfToken: string = await JWTUtil.generateJWTCSRFToken(new CSRFPayload(user.contactNo));

            // res.cookie("auth-token", sessionToken, {
            //     // secure: true,
            //     httpOnly: true
            // });
            return new SuccessResponse(ResponseMessages.VERIFY_OTP_SUCCESS, {
                user: instanceToPlain(user),
                token: {/*csrfToken: csrfToken,*/ authToken: sessionToken}
            }).send(res);
        } else {
            return new FailureMsgResponse(ResponseMessages.INCORRECT_OTP).send(res);
        }
    }

    private async otpStatus(req: any, res: any) {
        Logger.debug(req);
        return new SuccessMsgResponse("Done");
    }

}
