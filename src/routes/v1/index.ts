import 'reflect-metadata';
import express, {Router} from 'express';
import {autoInjectable, container} from 'tsyringe';
import ServerTestController from './server_test/TestServer';
import ProfileController from "./profile/base/ProfileController";
import ProductController from "./product/ProductController";
import SubscriptionPlanController from "./subscription/SubscriptionPlanController";
import PaymentController from "./payment/PaymentController";
import MarketingNotificationController from "./marketing_notification/MarketingNotificationController";
import MarketingSMSController from "./marketing_sms/MarketingSMSController";
import MarketingEmailController from "./marketing_email/MarketingEmailController";
import RegisterUserController from "./user/RegisterUserController";
import PersonalProfileController from "./profile/personal/PersonalProfileController";
import BusinessProfileController from "./profile/business/BusinessProfileController";
import FriendRequestController from "./friend/FriendRequestController";
import BeanConfig from "../../config/BeanConfig";

// const router = express.Router();
//
// const serverTestController = container.resolve(ServerTestController);
// const userController = container.resolve(RegisterUserController);
// const userPersonalProfileController = container.resolve(PersonalProfileController);
// const userBusinessProfileController = container.resolve(BusinessProfileController);
// const profileController = container.resolve(ProfileController);
// const productController = container.resolve(ProductController);
// const subscriptionPlanController = container.resolve(SubscriptionPlanController);
// const paymentController = container.resolve(PaymentController);
// const marketingEmailController = container.resolve(MarketingEmailController);
// const marketingNotificationController = container.resolve(MarketingNotificationController);
// const marketingSMSController = container.resolve(MarketingSMSController);
// const friendRequestController = container.resolve(FriendRequestController);


@autoInjectable()
export default class RouterConfig {
    private router: Router;
    private beanConfig: BeanConfig;
    private isConfigured: boolean;

    constructor(beanConfig: BeanConfig) {
        this.router = express.Router();
        this.beanConfig = beanConfig;
        this.isConfigured = false;
    }

    private configureTestRoutes() {
        this.router.use('/test', this.beanConfig.serverTestController.routes());
    }

    private configureProductRoutes() {
        this.router.use('/product', this.beanConfig.productController.routes());
    }

    private configurePaymentRoutes() {
        this.router.use('/payment', this.beanConfig.paymentController.routes());
    }

    private configureUserRoutes() {
        //Mapping user and Freind Request routes
        const userRouter = express.Router();
        const friendRequestRouter = express.Router({mergeParams: true});
        userRouter.use('/', friendRequestRouter);
        userRouter.use('/', this.beanConfig.userController.routes());
        friendRequestRouter.use('/friend-request', this.beanConfig.friendRequestController.routes());
        this.router.use('/user', userRouter);
    }

    private configureProfileRoutes() {
        const profileRouter = express.Router();
        const personalProfileRouter = express.Router({mergeParams: true});
        const businessProfileRouter = express.Router({mergeParams: true});
        profileRouter.use('/', personalProfileRouter);
        profileRouter.use('/', businessProfileRouter);
        profileRouter.use('/', this.beanConfig.profileController.routes())
        personalProfileRouter.use('/personal', this.beanConfig.userPersonalProfileController.routes());
        businessProfileRouter.use('/business', this.beanConfig.userBusinessProfileController.routes());

        this.router.use('/profile', profileRouter);
    }

    private configureMarketingRoutes() {
        //Merging Marketing Routes for Email, SMS and Notification Marketing
        const marketingRouter = express.Router();
        const marketingEmailRouter = express.Router({mergeParams: true});
        const marketingNotificationRouter = express.Router({mergeParams: true});
        const marketingSMSRouter = express.Router({mergeParams: true});
        marketingRouter.use('/', marketingEmailRouter);
        marketingRouter.use('/', marketingNotificationRouter);
        marketingRouter.use('/', marketingSMSRouter)
        marketingEmailRouter.use('/email', this.beanConfig.marketingEmailController.routes());
        marketingNotificationRouter.use('/notification', this.beanConfig.marketingNotificationController.routes());
        marketingSMSRouter.use('/sms', this.beanConfig.marketingSMSController.routes());

        this.router.use('/marketing', marketingRouter);
    }

    private configureStaticDataRoutes() {
        const staticDataRouter = express.Router();
        const subscriptionPlanRouter = express.Router({mergeParams: true});
        staticDataRouter.use('/', subscriptionPlanRouter);
        subscriptionPlanRouter.use('/sub-plan', this.beanConfig.subscriptionPlanController.routes());
        this.router.use('/static', staticDataRouter);
    }

    private configureStoryRoutes() {
        this.router.use('/story', this.beanConfig.storyController.routes());
    }

    public getRouter(): Router {
        if(this.isConfigured) {
            return this.router;
        }

        this.configureTestRoutes();
        this.configureProductRoutes();
        this.configurePaymentRoutes();
        this.configureUserRoutes();
        this.configureProfileRoutes();
        this.configureMarketingRoutes();
        this.configureStaticDataRoutes();
        this.configureStoryRoutes();
        this.isConfigured = true;
        return this.router;
    }
}
/*-------------------------------------------------------------------------*/
// Below all APIs are public APIs protected by api-key
// router.use('/', apikey);
/*-------------------------------------------------------------------------*/
//
// router.use('/test', serverTestController.routes());
// // router.use('/user', userController.routes());
// router.use('/product', productController.routes());
// router.use('/payment', paymentController.routes());
//
// //Mapping user and Freind Request routes
// const userRouter = express.Router();
// const friendRequestRouter = express.Router({mergeParams: true});
// userRouter.use('/', friendRequestRouter);
// userRouter.use('/', userController.routes());
// friendRequestRouter.use('/friend-request', friendRequestController.routes());
// router.use('/user', userRouter);
//
//
// //Merging Personal Profile Routes and Business Profile routers to User Router with base as /user
// const profileRouter = express.Router();
// const personalProfileRouter = express.Router({mergeParams: true});
// const businessProfileRouter = express.Router({mergeParams: true});
// profileRouter.use('/', personalProfileRouter);
// profileRouter.use('/', businessProfileRouter);
// profileRouter.use('/', profileController.routes())
// personalProfileRouter.use('/personal', userPersonalProfileController.routes());
// businessProfileRouter.use('/business', userBusinessProfileController.routes());
//
// router.use('/profile', profileRouter);
//
// //Merging static data routes
// const staticDataRouter = express.Router();
// const subscriptionPlanRouter = express.Router({mergeParams: true});
// staticDataRouter.use('/', subscriptionPlanRouter);
// subscriptionPlanRouter.use('/sub-plan', subscriptionPlanController.routes());
// router.use('/static', staticDataRouter);
//
//
// //Merging Marketing Routes for Email, SMS and Notification Marketing
// const marketingRouter = express.Router();
// const marketingEmailRouter = express.Router({mergeParams: true});
// const marketingNotificationRouter = express.Router({mergeParams: true});
// const marketingSMSRouter = express.Router({mergeParams: true});
// marketingRouter.use('/', marketingEmailRouter);
// marketingRouter.use('/', marketingNotificationRouter);
// marketingRouter.use('/', marketingSMSRouter)
// marketingEmailRouter.use('/email', marketingEmailController.routes());
// marketingNotificationRouter.use('/notification', marketingNotificationController.routes());
// marketingSMSRouter.use('/sms', marketingSMSController.routes());
//
// router.use('/marketing', marketingRouter);
//
// export default router;
