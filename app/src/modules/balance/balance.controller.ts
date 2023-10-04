import { NextFunction, Request, Response } from "express";
import { BalanceService } from "./balance.service";

const balanceService = new BalanceService();

export default class BalanceController {
  async getBalance(req: Request, res: Response, next: NextFunction) {
    try {
      const balance = await balanceService.getBalance();
      return res.json({ balance });
    } catch (error) {
      next(error);
    }
  }
}
