import { DataTypes, Model, Optional } from "sequelize";
import sequelizeConnection from "../config";
import bcrypt from 'bcrypt';

interface userAttributes {
    id: number;
    email: string;
    password: string;
    is_deleted: boolean;

    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface userInput extends Optional<userAttributes, 'id' | 'is_deleted'> { }
export interface userOutput extends Required<userAttributes> { }

class User extends Model<userAttributes, userInput> implements userAttributes {
    public id!: number;
    public email!: string;
    public password!: string;

    public validPassword(password: string): boolean {
        return bcrypt.compareSync(password, this.password);
    }

    public is_deleted!: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        },
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    is_deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    timestamps: true,
    paranoid: true,
    sequelize: sequelizeConnection,
    tableName: 'vertixusers',
    hooks: {
        beforeCreate: async (user: User) => {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        },
    },
});
export default User;