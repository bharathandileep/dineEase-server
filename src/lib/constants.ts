import dotenv from "dotenv";
dotenv.config();

export const port: number | string = process.env.PORT || 5000;
export const node_env: string | undefined = process.env.NODE_ENV;
