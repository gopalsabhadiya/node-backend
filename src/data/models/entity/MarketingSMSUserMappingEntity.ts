import {Association, DataTypes, Model, Sequelize, UUIDV4} from 'sequelize';
import MarketingSMSEntity from "./MarketingSMSEntity";

export default class MarketingSMSUserMappingEntity extends Model {
    public id!: string; // Note that the `null assertion` `!` is required in strict mode.
    public contactNo!: string;
    public marketingSMSId!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // You can also pre-declare possible inclusions, these will only be populated if you
    // actively include a relation.
    public readonly marketingSMS?: MarketingSMSEntity;

    public static associations: {
        marketingSMS: Association<MarketingSMSUserMappingEntity, MarketingSMSEntity>;
    };
}

export function initMarketingMarketingSMSUserMapping(sequelize: Sequelize): void {
    MarketingSMSUserMappingEntity.init({
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
            allowNull: false,
        },
        marketingSMSId: {
            field: 'marketing_sms_id',
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
        modelName: 'marketing_sms_user_mapping',
        tableName: "marketing_sms_user_mapping",
        sequelize: sequelize, // this bit is important
    });

}

export function associateMarketingSMSUserMapping(): void {
    // Here we associate which actually populates out pre-declared `association` static and other methods.
    MarketingSMSUserMappingEntity.belongsTo(MarketingSMSEntity, {
        targetKey: 'id',
        foreignKey: 'marketing_sms_id',
        as: 'marketingSMS'
    });
}

