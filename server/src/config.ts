import dotenv from "dotenv";
import * as env from "env-var";
dotenv.config();

export const accessTokenSecret = env.get("ACCESS_TOKEN_SECRET").asString();
export const resetLinkExpirationTime = env
  .get("RESET_LINK_EXPIRATION_TIME")
  .asString();
export const appBaseUrl = env.get("APP_BASE_URL").asString();
