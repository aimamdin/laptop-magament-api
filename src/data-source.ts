import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Specs } from "./entity/Specs";
import { Laptop } from "./entity/Laptop";
import dotenv from "dotenv";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Laptop, Specs],
  migrations: [],
  subscribers: [],
});
