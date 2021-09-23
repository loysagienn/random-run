import got from "got";
import { StravaCredentials, Athlete } from "types";
import { readAthlete } from "data";
import { API_URL } from "./constants";

export const getAthlete = async (
  credentials: StravaCredentials
): Promise<Athlete> => {
  const response = got.get(`${API_URL}/athlete`, {
    searchParams: {
      access_token: credentials.accessToken,
    },
  });

  const data = await response.json();

  const athlete = readAthlete(data);

  return athlete;
};
