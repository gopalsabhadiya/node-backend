import {Association, DataTypes, Model, Sequelize, UUIDV4} from 'sequelize';
import MarketingEmailEntity from "./MarketingEmailEntity";

export default class MarketingEmailUserMappingEntity extends Model {
    public id!: string; // Note that the `null assertion` `!` is required in strict mode.
    public emailId!: string;
    public marketingEmailId!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // You can also pre-declare possible inclusions, these will only be populated if you
    // actively include a relation.
    public readonly marketingEmail?: MarketingEmailEntity;

    public static associations: {
        marketingEmail: Association<MarketingEmailUserMappingEntity, MarketingEmailEntity>;
    };
}

export function initMarketingMarketingEmailUserMapping(sequelize: Sequelize): void {
    MarketingEmailUserMappingEntity.init({
        id: {
            field: 'id',
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        emailId: {
            field: 'email_id',
            type: DataTypes.STRING,
            allowNull: false,
        },
        marketingEmailId: {
            field: 'marketing_email_id',
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
        modelName: 'marketing_email_user_mapping',
        tableName: "marketing_email_user_mapping",
        sequelize: sequelize, // this bit is important
    });

}

export function associateMarketingEmailUserMapping(): void {
    // Here we associate which actually populates out pre-declared `association` static and other methods.
    MarketingEmailUserMappingEntity.belongsTo(MarketingEmailEntity, {
        targetKey: 'id',
        foreignKey: 'marketing_email_id',
        as: 'marketingEmail'
    });
}

