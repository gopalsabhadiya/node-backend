import {DataTypes, Model, Sequelize, UUIDV4} from 'sequelize';
// import {AddressEntity} from './Address';

export default class TNCEntity extends Model {
    public id!: string;
    public type!: string;
    public subType!: string;
    public description!: string;
    public order!: number;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export function initTermsAndCondition(sequelize: Sequelize): void {
    TNCEntity.init({
        id: {
            field: 'id',
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        type: {
            field: "type",
            type: DataTypes.STRING,
            allowNull: false,
        },
        subType: {
            field: "sub_type",
            type: DataTypes.STRING,
        },
        description: {
            field: "description",
            type: DataTypes.STRING,
        },
        order: {
            field: "order",
            type: DataTypes.INTEGER,
            defaultValue: 0
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
        modelName: 'terms_and_condition',
        tableName: "terms_and_condition",
        sequelize: sequelize, // this bit is important
    });
}


