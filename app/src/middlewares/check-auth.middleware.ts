import { NextFunction, Request, Response } from "express";
import { redisConnectionConfig } from "../config/redis.config";
import { ApiError } from "../utils/api-error.util";
import { Protocol } from "puppeteer";

export const checkAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const redis = redisConnectionConfig;
    const authDataString = await redis.get("authData");
    if (!authDataString) {
      return next(ApiError.UnauthorizedError());
    }
    const authDataArr: Protocol.Network.Cookie[] = JSON.parse(authDataString);
    const authCookie = authDataArr.find(
      (cookieItem) => cookieItem.name === "auth"
    );
    if (!authCookie) {
      return next(ApiError.UnauthorizedError());
    }
    const date = new Date(authCookie.expires * 1000);
    const validExpiration = authCookie.expires * 1000 > Date.now();
    if (!validExpiration) return next(ApiError.UnauthorizedError());
    next();
  } catch (err) {
    return next(ApiError.UnauthorizedError());
  }
};
