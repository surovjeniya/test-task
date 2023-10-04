import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.env.PWD as string, ".env") });

export const BROWSERLESS_CONFIG = {
  host: process.env.NODE_ENV ? process.env.BROWSERLESS_HOST_NAME : "localhost",
  port: process.env.BROWSERLESS_PORT,
};
