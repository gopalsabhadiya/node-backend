import {Association, DataTypes, Model, Sequelize, UUIDV4} from 'sequelize';
import UserEntity from './UserEntity'

export default class FriendRequestEntity extends Model {
    public id!: string; // Note that the `null assertion` `!` is required in strict mode.
    public senderId!: string;
    public receiverId!: string;
    public status!: string;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // You can also pre-declare possible inclusions, these will only be populated if you
    // actively include a relation.
    public readonly sender?: UserEntity; // Note this is optional since it's only populated when explicitly requested in code
    public readonly receiver?: UserEntity;

    public static associations: {
        sender: Association<FriendRequestEntity, UserEntity>;
        receiver: Association<FriendRequestEntity, UserEntity>;
    };
}

export function initFriendRequest(sequelize: Sequelize): void {
    FriendRequestEntity.init({
        id: {
            field: 'id',
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        senderId: {
            field: 'sender_id',
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            allowNull: false,
        },
        receiverId: {
            field: 'receiver_id',
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            allowNull: false,
        },
        status: {
            field: 'status',
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
        modelName: 'friend_request',
        tableName: "friend_request",
        sequelize: sequelize, // this bit is important
    });

}

export function associateFriendRequest(): void {
    // Here we associate which actually populates out pre-declared `association` static and other methods.
    FriendRequestEntity.belongsTo(
        UserEntity, {targetKey: 'id', foreignKey: "sender_id", as: "sender"}
    );
    FriendRequestEntity.belongsTo(
        UserEntity, {targetKey: 'id', foreignKey: "receiver_id", as: "receiver"}
    );


}

