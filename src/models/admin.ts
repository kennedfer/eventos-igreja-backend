import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db/db";

export class Admin extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Admin.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Admin",
    tableName: "admins",
    timestamps: true,
  }
);