import { Redis } from "ioredis";
import { redisConnectionConfig } from "../../config/redis.config";
import axios from "axios";
import { ApiError } from "../../utils/api-error.util";
import { Protocol } from "puppeteer";
import { GetProfileResponseInterface } from "./interfaces/get-profile-response.interface";

export class BalanceService {
  redis: Redis;
  constructor() {
    this.redis = redisConnectionConfig;
  }
  async getBalance(): Promise<number> {
    const authDataString = await this.redis.get("authData");
    if (!authDataString) {
      throw ApiError.UnauthorizedError();
    }
    const authDataObject: Protocol.Network.Cookie[] =
      JSON.parse(authDataString);

    const mappedData = authDataObject.map(
      (cookieItem) => `${cookieItem.name}=${cookieItem.value}`
    );
    const { data: profileData } = await axios.get<GetProfileResponseInterface>(
      "https://trending.bid/api/user/getprofile",
      {
        headers: {
          Cookie: mappedData.join(";"),
        },
      }
    );
    return profileData.data.balance;
  }
}
