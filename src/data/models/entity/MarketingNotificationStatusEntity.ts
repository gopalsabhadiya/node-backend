import {Association, DataTypes, Model, Sequelize, UUIDV4} from 'sequelize';
import UserEntity from './UserEntity'
import MarketingNotificationEntity from "./MarketingNotificationEntity";

export default class MarketingNotificationStatusEntity extends Model {
    public id!: string; // Note that the `null assertion` `!` is required in strict mode.
    public status!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // You can also pre-declare possible inclusions, these will only be populated if you
    // actively include a relation.
    public readonly user?: UserEntity; // Note this is optional since it's only populated when explicitly requested in code
    public readonly marketingNotification?: MarketingNotificationEntity;

    public static associations: {
        user: Association<MarketingNotificationStatusEntity, UserEntity>;
        marketingNotification: Association<MarketingNotificationStatusEntity, MarketingNotificationEntity>
    };
}

export function initMarketingNotificationStatus(sequelize: Sequelize): void {
    MarketingNotificationStatusEntity.init({
        id: {
            field: 'id',
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        status: {
            field: 'status',
            type: DataTypes.STRING,
            allowNull: false,
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
        modelName: 'marketing_notification_status',
        tableName: "marketing_notification_status",
        sequelize: sequelize, // this bit is important
    });

}

export function associateMarketingNotificationStatus(): void {
    // Here we associate which actually populates out pre-declared `association` static and other methods.
    MarketingNotificationStatusEntity.belongsTo(UserEntity, {targetKey: 'id', foreignKey: "user_id", as: "user"});
    MarketingNotificationStatusEntity.belongsTo(MarketingNotificationEntity, {
        targetKey: 'id',
        foreignKey: "marketing_notification_id",
        as: "marketing_notification"
    });
}

