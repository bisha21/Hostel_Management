// db/sequelize.ts
import { Sequelize } from "sequelize";
import pg from "pg";
import "dotenv/config";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set. Add it to your .env file.");
}

export const sequelize = new Sequelize(databaseUrl, {
  dialect: "postgres",
  dialectModule: pg, // pass the driver explicitly: Sequelize otherwise `require`s "pg" dynamically,
  // which Vercel's build tracer can't see, so it drops the package from the deployed bundle
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
