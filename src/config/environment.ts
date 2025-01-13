import dotenv from "dotenv";
dotenv.config();

export const port: number | string = process.env.PORT || 5000;
export const node_env: string | undefined = process.env.NODE_ENV;

// mongo db url
export const MONGO_DB_USERNAME: string | undefined =
  process.env.MONGO_DB_USERNAME;
export const MONGO_DB_PASSWORD: string | undefined =
  process.env.MONGO_DB_PASSWORD;

export const mongoURI = `mongodb+srv://${MONGO_DB_USERNAME}:${MONGO_DB_PASSWORD}@dineease-cluster-01.oag08.mongodb.net/`;
