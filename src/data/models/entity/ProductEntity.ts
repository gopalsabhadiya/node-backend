import {
    Association,
    DataTypes,
    HasManyAddAssociationMixin, HasManyAddAssociationsMixin, HasManyCountAssociationsMixin,
    HasManyGetAssociationsMixin,
    HasManyGetAssociationsMixinOptions, HasManyHasAssociationMixin,
    HasManySetAssociationsMixin,
    HasOneGetAssociationMixin,
    Model,
    Sequelize,
    UUIDV4
} from 'sequelize';
import UserEntity from './UserEntity'
import BusinessEntity from "./BusinessEntity";

export default class ProductEntity extends Model {
    public id!: string; // Note that the `null assertion` `!` is required in strict mode.
    public name!: string;
    public price!: number;
    public description!: string;
    public offer!: string;
    public itemCode!: string;
    public userId!: string;
    public businessId!: string;

    public active!: boolean;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getUser!: HasOneGetAssociationMixin<UserEntity>; // Note the null assertions!

    // You can also pre-declare possible inclusions, these will only be populated if you
    // actively include a relation.
    public readonly user?: UserEntity; // Note this is optional since it's only populated when explicitly requested in code
    public readonly business?: BusinessEntity;

    public static associations: {
        user: Association<ProductEntity, UserEntity>;
        business: Association<ProductEntity, BusinessEntity>
    };
}

export function initProduct(sequelize: Sequelize): void {
    ProductEntity.init({
        id: {
            field: 'id',
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            field: 'name',
            type: DataTypes.STRING,
        },
        price: {
            field: 'price',
            type: DataTypes.DECIMAL,
        },
        description: {
            field: 'description',
            type: DataTypes.STRING,
        },
        offer: {
            field: 'offer',
            type: DataTypes.STRING,
        },
        itemCode: {
            field: 'item_code',
            type: DataTypes.STRING,
        },
        userId: {
            field: 'user_id',
            type: DataTypes.STRING,
        },
        businessId: {
            field: 'business_id',
            type: DataTypes.STRING,
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
        modelName: 'product',
        tableName: 'product',
        sequelize: sequelize, // this bit is important
    });

}

export function associateProduct(): void {
    // Here we associate which actually populates out pre-declared `association` static and other methods.
    ProductEntity.belongsTo(BusinessEntity, {targetKey: 'id', foreignKey: "product_id", as: "business"});
    ProductEntity.belongsTo(UserEntity, {targetKey: 'id', foreignKey: "user_id", as: "user"});
}

