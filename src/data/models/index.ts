import {associateUser, initUser} from "./entity/UserEntity";
// import {associateAddress, initAddress} from "./entity/Address";
import {associateBusiness, initBusiness} from "./entity/BusinessEntity";
import dbConfig from '../config/config';
import {environment} from '../../config/Config';
import Logger from "../../util/Logger";
import {associateProduct, initProduct} from "./entity/ProductEntity";
import {initSubscriptionPlan} from "./entity/SubscriptionPlanEntity";
import {initTermsAndCondition} from "./entity/TNCEntity";
import {associatePaymentCard, initPaymentCard} from "./entity/PaymentCardEntity";
import {associateMarketingEmail, initMarketingEmail} from "./entity/MarketingEmailEntity";
import {associateMarketingNotification, initMarketingNotification} from "./entity/MarketingNotificationEntity";
import {
    associateMarketingNotificationUserMapping,
    initMarketingMarketingNotificationUserMapping
} from "./entity/MarketingNotificationUserMappingEntity";
import {
    associateMarketingEmailUserMapping,
    initMarketingMarketingEmailUserMapping
} from "./entity/MarketingEmailUserMappingEntity";
import {associateMarketingSMS, initMarketingSMS} from "./entity/MarketingSMSEntity";
import {
    associateMarketingSMSUserMapping,
    initMarketingMarketingSMSUserMapping
} from "./entity/MarketingSMSUserMappingEntity";
import {associateFriendRequest, initFriendRequest} from "./entity/FriendRequestEntity";
import {associateStory, initStory} from "./entity/StoryEntity";

const Sequelize = require('sequelize');

// @ts-ignore
const config = dbConfig[environment];

Logger.debug("Database config: ");
Logger.debug(config);

const sequelize = new Sequelize(config.database, config.username, config.password, config, {
    logging: Logger
});


initUser(sequelize);
initBusiness(sequelize);
initProduct(sequelize);
initSubscriptionPlan(sequelize);
initTermsAndCondition(sequelize);
initPaymentCard(sequelize);
initMarketingNotification(sequelize);
initMarketingMarketingNotificationUserMapping(sequelize);
initMarketingEmail(sequelize);
initMarketingMarketingEmailUserMapping(sequelize);
initMarketingSMS(sequelize);
initMarketingMarketingSMSUserMapping(sequelize);
initFriendRequest(sequelize);
initStory(sequelize);

associateUser();
associateBusiness();
associateProduct();
associatePaymentCard();
associateMarketingNotification();
associateMarketingNotificationUserMapping();
associateMarketingEmail();
associateMarketingEmailUserMapping();
associateMarketingSMS();
associateMarketingSMSUserMapping();
associateFriendRequest();
associateStory();

export default {
    sequelize,
    Sequelize,
    UserEntity: sequelize.models.UserEntity,
    BusinessEntity: sequelize.models.BusinessEntity,
    ProductEntity: sequelize.models.ProductEntity,
    SubscriptionPlanEntity: sequelize.models.SubscriptionPlanEntity,
    TermsAndConditionEntity: sequelize.models.TermsAndConditionEntity,
    MarketingNotificationEntity: sequelize.models.MarketingNotificationEntity,
    MarketingNotificationUserMappingEntity: sequelize.models.MarketingNotificationUserMappingEntity,
    MarketingEmailEntity: sequelize.models.MarketingEmailEntity,
    MarketingEmailUserMappingEntity: sequelize.models.MarketingEmailUserMappingEntity,
    MarketingSMSEntity: sequelize.models.MarketingSMSEntity,
    MarketingSMSUserMappingEntity: sequelize.models.MarketingSMSUserMappingEntity,
    StoryEntity: sequelize.models.StoryEntity,
}
