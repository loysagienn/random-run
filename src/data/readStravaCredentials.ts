import { StravaCredentials } from "types";

export const readStravaCredentials = (data: any): StravaCredentials => ({
  tokenType: data.token_type,
  expiresAt: data.expires_at,
  expiresIn: data.expires_in,
  refreshToken: data.refresh_token,
  accessToken: data.access_token,
});
