import {Association, DataTypes, HasOneGetAssociationMixin, Model, Sequelize, UUIDV4} from 'sequelize';
import UserEntity from './UserEntity'

export default class PaymentCardEntity extends Model {
    public id!: string; // Note that the `null assertion` `!` is required in strict mode.
    public holderName!: string;
    public number!: string;
    public expiryInfo!: string;

    public active!: boolean;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getUser!: HasOneGetAssociationMixin<UserEntity>; // Note the null assertions!

    // You can also pre-declare possible inclusions, these will only be populated if you
    // actively include a relation.
    public readonly user?: UserEntity; // Note this is optional since it's only populated when explicitly requested in code

    public static associations: {
        user: Association<PaymentCardEntity, UserEntity>;
    };
}

export function initPaymentCard(sequelize: Sequelize): void {
    PaymentCardEntity.init({
        id: {
            field: 'id',
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        holderName: {
            field: 'holder_name',
            type: DataTypes.STRING,
            allowNull: false,
        },
        number: {
            field: 'number',
            type: DataTypes.STRING,
            allowNull: false,
        },
        expiryInfo: {
            field: 'expiry_info',
            type: DataTypes.STRING,
            allowNull: false,
        },
        active: {
            field: 'active',
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false
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
        modelName: 'payment_card',
        tableName: "payment_card",
        sequelize: sequelize, // this bit is important
    });

}

export function associatePaymentCard(): void {
    // Here we associate which actually populates out pre-declared `association` static and other methods.
    PaymentCardEntity.belongsTo(UserEntity, {targetKey: 'id', foreignKey: "user_id", as: "user"});
}

