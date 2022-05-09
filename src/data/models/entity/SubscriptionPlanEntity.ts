import {DataTypes, Model, Sequelize, UUIDV4} from 'sequelize';
// import {AddressEntity} from './Address';

export default class SubscriptionPlanEntity extends Model {
    public id!: string;
    public type!: string;
    public description!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export function initSubscriptionPlan(sequelize: Sequelize): void {
    SubscriptionPlanEntity.init({
        id: {
            field: 'id',
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        type: {
            field: 'type',
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            field: 'description',
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
        modelName: 'subscription_plan',
        tableName: "subscription_plan",
        sequelize: sequelize, // this bit is important
    });
}


