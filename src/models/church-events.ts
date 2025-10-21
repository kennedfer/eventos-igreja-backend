import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../db/db";

interface ChurchEventAttributes {
  id: number;
  date: Date;
  location: string;
  title: string;
  description: string;
  type?: string | null;
  startHour: string;
  endHour: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type ChurchEventCreationAttributes = Optional<
  ChurchEventAttributes,
  "id" | "createdAt" | "updatedAt"
>;

export class ChurchEvent
  extends Model<ChurchEventAttributes, ChurchEventCreationAttributes>
  implements ChurchEventAttributes
{
  public id!: number;
  public date!: Date;
  public location!: string;
  public title!: string;
  public description!: string;
  public type!: string | null;
  public startHour!: string;
  public endHour!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ChurchEvent.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    startHour: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    endHour: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "ChurchEvent",
    tableName: "church_events",
    timestamps: true, // já cria e atualiza createdAt/updatedAt automaticamente
  }
);
