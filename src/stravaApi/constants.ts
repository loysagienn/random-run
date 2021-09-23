import { StravaScope } from "types";
const STRAVA_ORIGIN = "https://www.strava.com";

export const STRAVA_AUTHORIZE_URL = `${STRAVA_ORIGIN}/oauth/authorize`;
export const OAUTH_TOKEN_URL = `${STRAVA_ORIGIN}/oauth/token`;
export const DEAUTHORIZE_URL = `${STRAVA_ORIGIN}/oauth/deauthorize`;
export const API_URL = `${STRAVA_ORIGIN}/api/v3`;

export enum GRANT_TYPES {
  AUTHORIZATION_CODE = "authorization_code",
  REFRESH_TOKEN = "refresh_token",
}

export const SCOPES: StravaScope[] = [
  StravaScope.Read,
  StravaScope.ReadAll,
  StravaScope.ProfileReadAll,
  StravaScope.ActivityRead,
  StravaScope.ActivityReadAll,
];
