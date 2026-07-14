// db/sequelize.ts
import { Sequelize } from "sequelize";
import "dotenv/config";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set. Add it to your .env file.");
}

export const sequelize = new Sequelize(databaseUrl, {
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Neon uses valid certs; this just avoids CA-bundle issues in dev
    },
  },
  pool: {
    max: 5, // keep modest — you're already going through Neon's pooler
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
