import got from "got";
import { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET } from "config";
import { readStravaCredentials } from "data";
import type { StravaCredentials } from "types";
import { OAUTH_TOKEN_URL, GRANT_TYPES } from "./constants";

export const updateOauthToken = async (
  credentials: StravaCredentials
): Promise<StravaCredentials> => {
  const response = got.post(OAUTH_TOKEN_URL, {
    json: {
      refresh_token: credentials.refreshToken,
      client_id: STRAVA_CLIENT_ID,
      client_secret: STRAVA_CLIENT_SECRET,
      grant_type: GRANT_TYPES.REFRESH_TOKEN,
    },
  });

  const data = await response.json();

  return readStravaCredentials(data);
};
