import got from "got";
import { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET } from "config";
import { readStravaCredentials } from "data";
import type { AthleteId, StravaCredentials } from "types";
import { OAUTH_TOKEN_URL, GRANT_TYPES } from "./constants";

type Result = {
  athleteId: AthleteId;
  credentials: StravaCredentials;
};

type Response = {
  token_type: string;
  expires_at: number;
  expires_in: number;
  refresh_token: string;
  access_token: string;
  athlete: {
    id: AthleteId;
  };
};

export const getOauthToken = async (code: string): Promise<Result> => {
  const response = got.post(OAUTH_TOKEN_URL, {
    json: {
      code,
      client_id: STRAVA_CLIENT_ID,
      client_secret: STRAVA_CLIENT_SECRET,
      grant_type: GRANT_TYPES.AUTHORIZATION_CODE,
    },
  });

  const data: Response = await response.json();

  const credentials = readStravaCredentials(data);

  const athleteId = data.athlete.id;

  return {
    credentials,
    athleteId,
  };
};
