import Redis from "ioredis";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.env.PWD as string, ".env") });

export const redisConnectionConfig = new Redis({
  host: process.env.NODE_ENV ? process.env.REDIS_HOST_NAME : "localhost",
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,
});
