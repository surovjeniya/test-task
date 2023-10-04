import { Router } from "express";
import BalanceController from "./balance.controller";
import { checkAuthMiddleware } from "../../middlewares/check-auth.middleware";

//@ts-ignore
const balanceRouter = new Router();
balanceRouter.get(
  "/balance",
  checkAuthMiddleware,
  new BalanceController().getBalance
);

export default balanceRouter;
