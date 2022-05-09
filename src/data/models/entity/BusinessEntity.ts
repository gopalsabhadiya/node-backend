import {
    Association,
    DataTypes,
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
import ProductEntity from "./ProductEntity";

export default class BusinessEntity extends Model {
    public id!: string; // Note that the `null assertion` `!` is required in strict mode.
    public name!: string;
    public category!: string;
    public subCategory!: string;
    public description!: string;
    public longitude!: number;
    public latitude!: number;
    public interestedCategory!: string;
    public interestedSubCategory!: string;
    public active!: boolean;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getUser!: HasOneGetAssociationMixin<UserEntity>; // Note the null assertions!
    public getProducts!: HasManyGetAssociationsMixin<ProductEntity>;
    public setProduct!: HasManySetAssociationsMixin<ProductEntity, ProductEntity['id']>;
    public createProduct!: HasManyCreateAssociationMixin<ProductEntity>
    public hasProduct!: HasManyHasAssociationMixin<ProductEntity, ProductEntity['id']>;
    public countProduct!: HasManyCountAssociationsMixin;

    // You can also pre-declare possible inclusions, these will only be populated if you
    // actively include a relation.
    public readonly user?: UserEntity; // Note this is optional since it's only populated when explicitly requested in code
    public readonly product?: ProductEntity[];

    public static associations: {
        user: Association<BusinessEntity, UserEntity>;
        product: Association<BusinessEntity, ProductEntity>;
    };
}

export function initBusiness(sequelize: Sequelize): void {
    BusinessEntity.init({
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
            defaultValue: false,
            allowNull: false,
        },
        category: {
            field: 'category',
            type: DataTypes.STRING,
            defaultValue: false,
            allowNull: false,
        },
        subCategory: {
            field: 'sub_category',
            type: DataTypes.STRING,
            defaultValue: false,
            allowNull: false,
        },
        description: {
            field: 'description',
            type: DataTypes.STRING,
            defaultValue: false,
            allowNull: false,
        },
        longitude: {
            field: 'longitude',
            type: DataTypes.DECIMAL(9, 6),
        },
        latitude: {
            field: 'latitude',
            type: DataTypes.DECIMAL(9, 6),
        },
        interestedCategory: {
            field: 'interested_category',
            type: DataTypes.STRING,
        },
        interestedSubCategory: {
            field: 'interested_sub_category',
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
        modelName: 'business',
        tableName: "business",
        sequelize: sequelize, // this bit is important
    });

}

export function associateBusiness(): void {
    // Here we associate which actually populates out pre-declared `association` static and other methods.
    BusinessEntity.belongsTo(UserEntity, {targetKey: 'id', foreignKey: "user_id", as: "user"});
    BusinessEntity.hasMany(ProductEntity, {sourceKey: 'id', foreignKey: 'business_id', as: "product"});
}

