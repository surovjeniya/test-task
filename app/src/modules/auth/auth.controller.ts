import { NextFunction, Request, Response } from "express";
import AuthService from "./auth.service";
import { Result, ValidationError, validationResult } from "express-validator";
import { ApiError } from "../../utils/api-error.util";

const authService = new AuthService();

export default class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        //@ts-ignore
        throw ApiError.BadRequest("Validation error", errors);
      }
      const { login, password } = req.body;
      const authData = await authService.login(login, password);
      return res.json(authData);
    } catch (error) {
      next(error);
    }
  }
}
