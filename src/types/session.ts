import { AthleteId } from "./strava";

export type Session = {
  sessionId: string;
  userAgent: string | null;
  timestamp: number;
  athleteId: AthleteId | null;
};
