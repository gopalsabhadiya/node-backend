import {
    Association,
    DataTypes,
    HasManyAddAssociationsMixin,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin,
    HasManyGetAssociationsMixin,
    HasManyHasAssociationMixin,
    HasManySetAssociationsMixin,
    HasOneGetAssociationMixin,
    Model,
    Sequelize,
    UUIDV4
} from 'sequelize';
import UserEntity from './UserEntity'
import MarketingNotificationUserMappingEntity from "./MarketingNotificationUserMappingEntity";

export default class MarketingNotificationEntity extends Model {
    public id!: string; // Note that the `null assertion` `!` is required in strict mode.
    public title!: string;
    public description!: string;
    public link!: string;
    public userId!: string;
    public hasImage!: boolean;

    public active!: boolean;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getUser!: HasOneGetAssociationMixin<UserEntity>; // Note the null assertions!

    public getUsers!: HasManyGetAssociationsMixin<MarketingNotificationUserMappingEntity>;
    public setUsers!: HasManySetAssociationsMixin<MarketingNotificationUserMappingEntity, MarketingNotificationUserMappingEntity['id']>;
    public createUsers!: HasManyCreateAssociationMixin<MarketingNotificationUserMappingEntity>;
    public addUsers!: HasManyAddAssociationsMixin<MarketingNotificationUserMappingEntity, MarketingNotificationUserMappingEntity['id']>;
    public hasUsers!: HasManyHasAssociationMixin<MarketingNotificationUserMappingEntity, MarketingNotificationUserMappingEntity['id']>;
    public countUsers!: HasManyCountAssociationsMixin;

    // You can also pre-declare possible inclusions, these will only be populated if you
    // actively include a relation.
    public readonly user?: UserEntity; // Note this is optional since it's only populated when explicitly requested in code
    public readonly users?: MarketingNotificationUserMappingEntity[];

    public static associations: {
        user: Association<MarketingNotificationEntity, UserEntity>;
        users: Association<MarketingNotificationEntity, MarketingNotificationUserMappingEntity>;
    };
}

export function initMarketingNotification(sequelize: Sequelize): void {
    MarketingNotificationEntity.init({
        id: {
            field: 'id',
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        title: {
            field: 'title',
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            field: 'description',
            type: DataTypes.STRING,
            allowNull: false,
        },
        link: {
            field: 'link',
            type: DataTypes.STRING,
            allowNull: false,
        },
        hasImage: {
            field: 'has_image',
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false
        },
        active: {
            field: 'active',
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false
        },
        userId: {
            field: 'user_id',
            type: DataTypes.STRING,
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
        modelName: 'marketing_notification',
        tableName: "marketing_notification",
        sequelize: sequelize, // this bit is important
    });

}

export function associateMarketingNotification(): void {
    // Here we associate which actually populates out pre-declared `association` static and other methods.
    MarketingNotificationEntity.belongsTo(
        UserEntity,
        {targetKey: "id", foreignKey: "user_id", as: "user"}
    );
    MarketingNotificationEntity.hasMany(
        MarketingNotificationUserMappingEntity,
        {
            sourceKey: "id",
            foreignKey: "marketing_notification_id",
            as: "users"
        }
    );
}

