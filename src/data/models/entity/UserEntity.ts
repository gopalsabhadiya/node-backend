import {
    Association,
    DataTypes,
    HasManyAddAssociationMixin,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin,
    HasManyGetAssociationsMixin,
    HasManyHasAssociationMixin,
    HasManySetAssociationsMixin,
    HasOneCreateAssociationMixin,
    HasOneGetAssociationMixin,
    HasOneSetAssociationMixin,
    Model,
    Sequelize,
    UUIDV4
} from 'sequelize';
import BusinessEntity from "./BusinessEntity";
import ProductEntity from "./ProductEntity";
import PaymentCardEntity from "./PaymentCardEntity";
import MarketingNotificationEntity from "./MarketingNotificationEntity";
import MarketingEmailEntity from "./MarketingEmailEntity";
import MarketingSMSEntity from "./MarketingSMSEntity";
import FriendRequestEntity from "./FriendRequestEntity";
import {Expose} from "class-transformer";
import StoryEntity from "./StoryEntity";

export default class UserEntity extends Model {
    public id!: string;
    public contactNo!: string;
    public fullName!: string;
    public nickName!: string;
    public longitude!: number;
    public latitude!: number;
    public areaRange!: number;
    public gender!: string;
    public targetAudienceAgeMin!: number;
    public targetAudienceAgeMax!: number;
    public hasImage!: boolean;
    public userName!: string;
    public emailId!: string;
    public isBusinessProfileRegistered!: boolean;
    public isPersonalProfileRegistered!: boolean;
    public facebookLink?: string;
    public instagramLink?: string;
    public twitterLink?: string;
    public linkedinLink?: string;
    public active!: boolean;


    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getBusiness!: HasOneGetAssociationMixin<BusinessEntity>; // Note the null assertions!
    public setBusiness!: HasOneSetAssociationMixin<BusinessEntity, BusinessEntity['id']>;
    public createBusiness!: HasOneCreateAssociationMixin<BusinessEntity>;

    public getPaymentCardList!: HasManyGetAssociationsMixin<PaymentCardEntity>;
    public setPaymentCard!: HasManySetAssociationsMixin<PaymentCardEntity, PaymentCardEntity['id']>;
    public createPaymentCard!: HasManyCreateAssociationMixin<PaymentCardEntity>
    public hasPaymentCard!: HasManyHasAssociationMixin<PaymentCardEntity, PaymentCardEntity['id']>;
    public countPaymentCard!: HasManyCountAssociationsMixin;

    public getMarketingNotification!: HasManyGetAssociationsMixin<MarketingNotificationEntity>;
    public setMarketingNotification!: HasManySetAssociationsMixin<MarketingNotificationEntity, MarketingNotificationEntity['id']>;
    public addMarketingNotification!: HasManyAddAssociationMixin<MarketingNotificationEntity, MarketingNotificationEntity['id']>
    public createMarketingNotification!: HasManyCreateAssociationMixin<MarketingNotificationEntity>
    public hasMarketingNotification!: HasManyHasAssociationMixin<MarketingNotificationEntity, MarketingNotificationEntity['id']>;
    public countMarketingNotification!: HasManyCountAssociationsMixin;

    public getMarketingEmail!: HasManyGetAssociationsMixin<MarketingEmailEntity>;
    public setMarketingEmail!: HasManySetAssociationsMixin<MarketingEmailEntity, MarketingEmailEntity['id']>;
    public addMarketingEmail!: HasManyAddAssociationMixin<MarketingEmailEntity, MarketingEmailEntity['id']>
    public createMarketingEmail!: HasManyCreateAssociationMixin<MarketingEmailEntity>
    public hasMarketingEmail!: HasManyHasAssociationMixin<MarketingEmailEntity, MarketingEmailEntity['id']>;
    public countMarketingEmail!: HasManyCountAssociationsMixin;

    public getMarketingSMS!: HasManyGetAssociationsMixin<MarketingSMSEntity>;
    public setMarketingSMS!: HasManySetAssociationsMixin<MarketingSMSEntity, MarketingSMSEntity['id']>;
    public addMarketingSMS!: HasManyAddAssociationMixin<MarketingSMSEntity, MarketingSMSEntity['id']>
    public createMarketingSMS!: HasManyCreateAssociationMixin<MarketingSMSEntity>
    public hasMarketingSMS!: HasManyHasAssociationMixin<MarketingSMSEntity, MarketingSMSEntity['id']>;
    public countMarketingSMS!: HasManyCountAssociationsMixin;

    public getStory!: HasManyGetAssociationsMixin<StoryEntity>;
    public setStory!: HasManySetAssociationsMixin<StoryEntity, StoryEntity['id']>;
    public addStory!: HasManyAddAssociationMixin<StoryEntity, StoryEntity['id']>
    public createStory!: HasManyCreateAssociationMixin<StoryEntity>
    public hasStory!: HasManyHasAssociationMixin<StoryEntity, StoryEntity['id']>;
    public countStory!: HasManyCountAssociationsMixin;


    // You can also pre-declare possible inclusions, these will only be populated if you
    // actively include a relation.
    // public readonly address?: AddressEntity; // Note this is optional since it's only populated when explicitly requested in code
    public readonly business?: BusinessEntity;
    public readonly product?: ProductEntity[];
    public readonly paymentCard?: PaymentCardEntity[];
    public readonly marketingNotification?: MarketingNotificationEntity[];
    public readonly marketingEmail?: MarketingEmailEntity[];
    public readonly marketingSMS?: MarketingSMSEntity[];
    public readonly sentTo?: FriendRequestEntity[];
    public readonly  receivedFrom?: FriendRequestEntity[];
    public readonly story?: StoryEntity[];

    public static associations: {
        business: Association<UserEntity, BusinessEntity>;
        product: Association<UserEntity, ProductEntity>;
        paymentCard: Association<UserEntity, PaymentCardEntity>;
        marketingNotification: Association<UserEntity, MarketingNotificationEntity>;
        marketingEmail: Association<UserEntity, MarketingEmailEntity>;
        marketingSMS: Association<UserEntity, MarketingSMSEntity>;
        sentTo: Association<UserEntity, FriendRequestEntity>;
        receivedFrom: Association<UserEntity, FriendRequestEntity>;
        story: Association<UserEntity, StoryEntity>;
    };

}

export function initUser(sequelize: Sequelize): void {
    UserEntity.init({
        id: {
            field: 'id',
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        contactNo: {
            field: 'contact_no',
            type: DataTypes.STRING,
            unique: true,
        },
        fullName: {
            field: 'full_name',
            type: DataTypes.STRING,
        },
        userName: {
            field: 'user_name',
            type: DataTypes.STRING,
        },
        emailId: {
            field: 'email_id',
            type: DataTypes.STRING,
        },
        nickName: {
            field: 'nick_name',
            type: DataTypes.STRING,
        },
        longitude: {
            field: 'longitude',
            type: DataTypes.DECIMAL(9, 6),
        },
        latitude: {
            field: 'latitude',
            type: DataTypes.DECIMAL(9, 6),
        },
        areaRange:{
            field: 'area_range',
            type: DataTypes.INTEGER,
        },
        gender: {
            field: 'gender',
            type: DataTypes.STRING,
        },
        targetAudienceAgeMin:{
            field: 'target_audience_age_min',
            type: DataTypes.INTEGER,
        },
        targetAudienceAgeMax:{
            field: 'target_audience_age_max',
            type: DataTypes.INTEGER,
        },
        hasImage: {
            field: 'has_image',
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        isBusinessProfileRegistered: {
            field: 'is_business_profile_registered',
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        isPersonalProfileRegistered: {
            field: 'is_personal_profile_registered',
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        facebookLink: {
            field: 'facebook_link',
            type: DataTypes.STRING,
        },
        instagramLink: {
            field: 'instagram_link',
            type: DataTypes.STRING,
        },
        twitterLink: {
            field: 'twitter_link',
            type: DataTypes.STRING,
        },
        linkedinLink: {
            field: 'linkedin_link',
            type: DataTypes.STRING,
        },
        active: {
            field: 'active',
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
        createdAt: {
            field: 'created_at',
            type: DataTypes.DATE,
        },
        updatedAt: {
            field: 'updated_at',
            type: DataTypes.DATE,
        }
    }, {
        modelName: 'user',
        tableName: "user",
        sequelize: sequelize, // this bit is important
    });
}

export function associateUser(): void {
    UserEntity.hasOne(BusinessEntity, {
        sourceKey: 'id',
        foreignKey: 'user_id',
        as: 'business' // this determines the name in `associations`!
    });
    UserEntity.hasMany(ProductEntity, {
        sourceKey: 'id',
        foreignKey: 'user_id',
        as: 'product'
    });
    UserEntity.hasMany(PaymentCardEntity, {
        sourceKey: 'id',
        foreignKey: 'user_id',
        as: 'paymentCard'
    });
    UserEntity.hasMany(MarketingNotificationEntity, {
        sourceKey: 'id',
        foreignKey: 'user_id',
        as: 'marketingNotification'
    });
    UserEntity.hasMany(MarketingEmailEntity, {
        sourceKey: 'id',
        foreignKey: 'user_id',
        as: 'marketingEmail'
    });
    UserEntity.hasMany(MarketingSMSEntity, {
        sourceKey: 'id',
        foreignKey: 'user_id',
        as: 'marketingSMS'
    });
    UserEntity.hasMany(FriendRequestEntity, {
        sourceKey: 'id',
        foreignKey: 'sender_id',
        as: 'sentTo'
    });
    UserEntity.hasMany(FriendRequestEntity, {
        sourceKey: 'id',
        foreignKey: 'receiver_id',
        as: 'receivedFrom'
    });
    UserEntity.hasMany(StoryEntity, {
        sourceKey: 'id',
        foreignKey: 'story_id',
        as: 'story'
    });
}

