import path from "path";
import type { ExternalConfig } from "types";

export const ROOT = path.resolve(__dirname, "../../");

export const DB_URL = "mongodb://127.0.0.1:27017";
export const DB_ID = "random_run";

export const DOMAIN = "localhost";

export const SESSION_ID_COOKIE_NAME = "session_id";

let externalConfig: ExternalConfig = {};

try {
  const externalConfigPath = path.resolve(ROOT, `config.js`);

  externalConfig = require(externalConfigPath);
} catch (error) {}

export const HTTP_PORT = externalConfig.HTTP_PORT || 8081;
export const STRAVA_CLIENT_ID = externalConfig.STRAVA_CLIENT_ID || 0;
export const STRAVA_CLIENT_SECRET = externalConfig.STRAVA_CLIENT_SECRET || "";
export const YANDEX_MAPS_API_KEY = externalConfig.YANDEX_MAPS_API_KEY || "";
