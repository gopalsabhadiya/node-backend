import {container, singleton} from "tsyringe";
import ServerTestController from "../routes/v1/server_test/TestServer";
import RegisterUserController from "../routes/v1/user/RegisterUserController";
import PersonalProfileController from "../routes/v1/profile/personal/PersonalProfileController";
import BusinessProfileController from "../routes/v1/profile/business/BusinessProfileController";
import ProfileController from "../routes/v1/profile/base/ProfileController";
import ProductController from "../routes/v1/product/ProductController";
import SubscriptionPlanController from "../routes/v1/subscription/SubscriptionPlanController";
import PaymentController from "../routes/v1/payment/PaymentController";
import MarketingEmailController from "../routes/v1/marketing_email/MarketingEmailController";
import MarketingNotificationController from "../routes/v1/marketing_notification/MarketingNotificationController";
import MarketingSMSController from "../routes/v1/marketing_sms/MarketingSMSController";
import FriendRequestController from "../routes/v1/friend/FriendRequestController";
import {Twilio} from "twilio";
import {TWILIO} from "./Config";
import StoryController from "../routes/v1/story/StoryController";

@singleton()
export default class BeanConfig {
    //Controllers
    private readonly _serverTestController: ServerTestController;
    private readonly _userController: RegisterUserController;
    private readonly _userPersonalProfileController: PersonalProfileController;
    private readonly _userBusinessProfileController: BusinessProfileController;
    private readonly _profileController: ProfileController;
    private readonly _productController: ProductController;
    private readonly _subscriptionPlanController: SubscriptionPlanController;
    private readonly _paymentController: PaymentController;
    private readonly _marketingEmailController: MarketingEmailController;
    private readonly _marketingNotificationController: MarketingNotificationController;
    private readonly _marketingSMSController: MarketingSMSController;
    private readonly _friendRequestController: FriendRequestController;
    private readonly _storyController: StoryController;

    //Twilio
    private readonly _twilioClient: Twilio;


    constructor() {
        this._serverTestController = container.resolve(ServerTestController);
        this._userController = container.resolve(RegisterUserController);
        this._userPersonalProfileController = container.resolve(PersonalProfileController);
        this._userBusinessProfileController = container.resolve(BusinessProfileController);
        this._profileController = container.resolve(ProfileController);
        this._productController = container.resolve(ProductController);
        this._subscriptionPlanController = container.resolve(SubscriptionPlanController);
        this._paymentController = container.resolve(PaymentController);
        this._marketingEmailController = container.resolve(MarketingEmailController);
        this._marketingNotificationController = container.resolve(MarketingNotificationController);
        this._marketingSMSController = container.resolve(MarketingSMSController);
        this._friendRequestController = container.resolve(FriendRequestController);
        this._storyController = container.resolve(StoryController);
        this._twilioClient = new Twilio(TWILIO.sid, TWILIO.token);
    }

    get serverTestController(): ServerTestController {
        return this._serverTestController;
    }

    get userController(): RegisterUserController {
        return this._userController;
    }

    get userPersonalProfileController(): PersonalProfileController {
        return this._userPersonalProfileController;
    }

    get userBusinessProfileController(): BusinessProfileController {
        return this._userBusinessProfileController;
    }

    get profileController(): ProfileController {
        return this._profileController;
    }

    get productController(): ProductController {
        return this._productController;
    }

    get subscriptionPlanController(): SubscriptionPlanController {
        return this._subscriptionPlanController;
    }

    get paymentController(): PaymentController {
        return this._paymentController;
    }

    get marketingEmailController(): MarketingEmailController {
        return this._marketingEmailController;
    }

    get marketingNotificationController(): MarketingNotificationController {
        return this._marketingNotificationController;
    }

    get marketingSMSController(): MarketingSMSController {
        return this._marketingSMSController;
    }

    get friendRequestController(): FriendRequestController {
        return this._friendRequestController;
    }

    get twilioClient(): Twilio {
        return this._twilioClient;
    }

    get storyController(): StoryController {
        return this._storyController;
    }
}