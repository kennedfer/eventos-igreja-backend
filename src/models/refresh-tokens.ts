import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/db";

interface RefreshTokenAttributes {
    id?: number;
    userId: number;
    token: string;
    expiresAt: Date;
}

export class RefreshToken extends Model<RefreshTokenAttributes> implements RefreshTokenAttributes {
    public id!: number;
    public userId!: number;
    public token!: string;
    public expiresAt!: Date;
}

RefreshToken.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER
        },
        token: {
            type: DataTypes.STRING
        },
        expiresAt: {
            type: DataTypes.DATE
        }
    },
    {
        sequelize,
        modelName: "RefreshToken",
        tableName: "refresh_tokens",
        timestamps: true,
    }
);