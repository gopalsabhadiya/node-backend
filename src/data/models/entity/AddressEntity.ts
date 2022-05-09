// import {Association, DataTypes, HasOneGetAssociationMixin, Model, Sequelize, UUIDV4} from 'sequelize';
// import UserEntity from './UserEntity'
//
// export class AddressEntity extends Model {
//     public id!: string; // Note that the `null assertion` `!` is required in strict mode.
//     public pinCode!: string;
//     public city!: string;
//     public state!: string;
//     public country!: string;
//     public active!: boolean;
//
//     // timestamps!
//     public readonly createdAt!: Date;
//     public readonly updatedAt!: Date;
//
//     public getUser!: HasOneGetAssociationMixin<UserEntity>; // Note the null assertions!
//
//     // You can also pre-declare possible inclusions, these will only be populated if you
//     // actively include a relation.
//     public readonly user?: UserEntity; // Note this is optional since it's only populated when explicitly requested in code
//
//     public static associations: {
//         user: Association<AddressEntity, UserEntity>;
//     };
// }
//
// export function initAddress(sequelize: Sequelize): void {
//     AddressEntity.init({
//         id: {
//             type: DataTypes.UUID,
//             defaultValue: UUIDV4,
//             allowNull: false,
//             primaryKey: true,
//         },
//         pinCode: {
//             type: DataTypes.STRING,
//         },
//         city: {
//             type: DataTypes.STRING,
//         },
//         state: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         country: {
//             type: DataTypes.STRING,
//             allowNull: false,
//         },
//         active: {
//             type: DataTypes.BOOLEAN,
//             defaultValue: true,
//         },
//         createdAt: {
//             field: 'created_at',
//             type: DataTypes.DATE,
//         },
//         updatedAt: {
//             field: 'updated_at',
//             type: DataTypes.DATE,
//         }
//     }, {
//         modelName: 'address',
//         tableName: "address",
//         sequelize: sequelize, // this bit is important
//     });
//
// }
//
// export function associateAddress(): void {
//     // Here we associate which actually populates out pre-declared `association` static and other methods.
//     AddressEntity.belongsTo(UserEntity, {targetKey: 'id', foreignKey: "user_id"});
// }
//
