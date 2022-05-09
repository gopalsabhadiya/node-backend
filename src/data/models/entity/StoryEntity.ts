import {
    Association,
    DataTypes,
    HasOneGetAssociationMixin,
    Model,
    Sequelize,
    UUIDV4
} from 'sequelize';
import UserEntity from './UserEntity'

export default class StoryEntity extends Model {
    public id!: string; // Note that the `null assertion` `!` is required in strict mode.
    public type!: string;
    public startTime!: Date;
    public endTime!: Date;
    public viewCount!: number;
    public active!: boolean;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getUser!: HasOneGetAssociationMixin<UserEntity>; // Note the null assertions!

    // You can also pre-declare possible inclusions, these will only be populated if you
    // actively include a relation.
    public readonly user?: UserEntity; // Note this is optional since it's only populated when explicitly requested in code

    public static associations: {
        user: Association<StoryEntity, UserEntity>;
    };
}

export function initStory(sequelize: Sequelize): void {
    StoryEntity.init({
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
            allowNull: false
        },
        startTime: {
            field: 'start_time',
            type: DataTypes.DATE,
            allowNull: false
        },
        endTime: {
            field: 'end_time',
            type: DataTypes.DATE,
            allowNull: false
        },
        viewCount: {
            field: 'view_count',
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: false
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
        modelName: 'story',
        tableName: "story",
        sequelize: sequelize, // this bit is important
    });

}

export function associateStory(): void {
    // Here we associate which actually populates out pre-declared `association` static and other methods.
    StoryEntity.belongsTo(UserEntity, {targetKey: 'id', foreignKey: "user_id", as: "user"});
}

