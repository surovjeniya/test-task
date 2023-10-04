import { Router } from "express";
import { check } from "express-validator";
import AuthController from "./auth.controller";
import { checkCaptchaBalanceMiddleware } from "../../middlewares/check-captcha-balance.middleware";

//@ts-ignore
const authRouter = new Router();

authRouter.post(
  "/auth",
  [
    check("login", "login is not be empty").notEmpty().isString(),
    check("password", "password is not be empty").notEmpty().isString(),
  ],
  checkCaptchaBalanceMiddleware,
  new AuthController().login
);

export default authRouter;
