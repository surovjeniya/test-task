import dotenv from "dotenv";
import * as Joi from "joi";
import path from "node:path";

export default () => {
  dotenv.config({ path: path.join(process.env.PWD as string, ".env") });
  const envSchema = Joi.object({
    PORT: Joi.number().required(),
    REDIS_HOST_NAME: Joi.string().required(),
    REDIS_PORT: Joi.number().required(),
    TWO_CAPTCHA_TOKEN: Joi.string().required(),
    BROWSERLESS_HOST_NAME: Joi.string().required(),
    BROWSERLESS_PORT: Joi.number().required(),
    REDIS_PASSWORD: Joi.string().required(),
  }).unknown();

  const { error, value: envVars } = envSchema.validate(process.env);
  if (error) {
    throw new Error(`Env validation error: ${error.message}`);
  }
};
