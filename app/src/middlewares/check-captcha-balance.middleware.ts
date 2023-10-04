import { NextFunction, Request, Response } from "express";
import axios from "axios";
import { ApiError } from "../utils/api-error.util";

export interface CaptchaBalanceInterface {
  errorId: number;
  balance: number;
}

export const checkCaptchaBalanceMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { data } = await axios.post<CaptchaBalanceInterface>(
      "https://api.2captcha.com/getBalance",
      {
        clientKey: process.env.TWO_CAPTCHA_TOKEN,
      }
    );
    console.log(data.balance);
    if (data.balance <= 0) {
      return next(
        ApiError.BadRequest(`Balance is over.Current balance ${data.balance}`)
      );
    }
    next();
  } catch (error) {
    return next(ApiError.BadRequest(`Check balance error.`));
  }
};
