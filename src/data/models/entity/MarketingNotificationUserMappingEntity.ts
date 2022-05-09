import {Association, DataTypes, Model, Sequelize, UUIDV4} from 'sequelize';
import MarketingNotificationEntity from "./MarketingNotificationEntity";
import UserEntity from "./UserEntity";

export default class MarketingNotificationUserMappingEntity extends Model {
    public id!: string; // Note that the `null assertion` `!` is required in strict mode.
    public userId!: string;
    public marketingNotificationId!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // You can also pre-declare possible inclusions, these will only be populated if you
    // actively include a relation.
    public readonly user?: UserEntity;
    public readonly marketingNotification?: MarketingNotificationEntity;

    public static associations: {
        user: Association<MarketingNotificationUserMappingEntity, UserEntity>;
        marketingNotification: Association<MarketingNotificationUserMappingEntity, MarketingNotificationEntity>
    };
}

export function initMarketingMarketingNotificationUserMapping(sequelize: Sequelize): void {
    MarketingNotificationUserMappingEntity.init({
        id: {
            field: 'id',
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        userId: {
            field: 'user_id',
            type: DataTypes.UUID,
            allowNull: false,
        },
        marketingNotificationId: {
            field: 'marketing_notification_id',
            type: DataTypes.UUID,
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
        modelName: 'marketing_notification_user_mapping',
        tableName: "marketing_notification_user_mapping",
        sequelize: sequelize, // this bit is important
    });

}

export function associateMarketingNotificationUserMapping(): void {
    // Here we associate which actually populates out pre-declared `association` static and other methods.
    MarketingNotificationUserMappingEntity.belongsTo(
        UserEntity,
        {
            targetKey: 'id',
            foreignKey: 'user_id',
            as: 'user'
        });
    MarketingNotificationUserMappingEntity.belongsTo(MarketingNotificationEntity, {
        targetKey: 'id',
        foreignKey: 'marketing_notification_id',
        as: 'marketingNotification'
    });
}

