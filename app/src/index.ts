import express from "express";
import envValidator from "./config/env-validator";
import dotenv from "dotenv";
import path from "path";
import apiErrorMiddleware from "./middlewares/api-error.middleware";
import {
  API_GLOBAL_PREFIX,
  API_VERSION_ENUM,
} from "./constants/api-global-prefix.constant";
import balanceRouter from "./modules/balance/balance.router";
import authRouter from "./modules/auth/auth.router";
import morgan from "morgan";

dotenv.config({
  path: path.join(process.env.PWD as string, ".env"),
});

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(`${API_GLOBAL_PREFIX}${API_VERSION_ENUM.V1}`, authRouter);
app.use(`${API_GLOBAL_PREFIX}${API_VERSION_ENUM.V1}`, balanceRouter);

app.use(apiErrorMiddleware);

const start = async (port: number) => {
  envValidator();
  app.listen(port, () => console.log("server has been started on port:", port));
};

start(Number(process.env.PORT));
