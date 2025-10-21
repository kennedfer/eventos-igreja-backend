import { configDotenv } from "dotenv";
import { Sequelize } from "sequelize";

configDotenv();

export const sequelize = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: "postgres",
  dialectOptions: {
    ssl: { require: true, rejectUnauthorized: false }, // necessário pro Neon
  },
  logging: false,
});