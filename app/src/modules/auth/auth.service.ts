import * as RecaptchaPlugin from "puppeteer-extra-plugin-recaptcha";
import * as puppeteer from "puppeteer-extra";
import { Redis } from "ioredis";
import { redisConnectionConfig } from "../../config/redis.config";
import { ApiError } from "../../utils/api-error.util";

export default class AuthService {
  redis: Redis;
  constructor() {
    this.redis = redisConnectionConfig;
  }
  async login(login: string, password: string): Promise<string> {
    puppeteer.default.use(
      RecaptchaPlugin.default({
        provider: {
          id: "2captcha",
          token: process.env.TWO_CAPTCHA_TOKEN,
        },
        visualFeedback: true,
      })
    );

    const browserLessHost = process.env.NODE_ENV
      ? process.env.BROWSERLESS_HOST_NAME
      : "localhost";
    const browserless_config_str = `ws://${browserLessHost}:${process.env.BROWSERLESS_PORT}`;

    const browser = await puppeteer.default.connect({
      browserWSEndpoint: browserless_config_str,
    });
    const page = await browser.newPage();
    await page.goto("https://trending.bid/login", { waitUntil: "load" });

    await page.solveRecaptchas();

    await page.click('input[id="username"]', { delay: 10 });
    await page.type('input[id="username"]', login, { delay: 10 });

    await page.click('input[id="password"]', { delay: 10 });
    await page.type('input[id="password"]', password, { delay: 10 });

    await Promise.all([
      page.waitForNavigation(),
      page.click('button[id="btn-submit"]'),
    ]);

    const cookies = await page.cookies();
    await browser.close();

    if (cookies.find((item) => item.name === "auth")) {
      this.redis.set("authData", JSON.stringify(cookies));
      return "Login success.";
    } else {
      throw ApiError.UnauthorizedError();
    }
  }
}
