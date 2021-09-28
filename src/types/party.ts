import type { Coords } from "./common";
import type { AthleteId } from "./strava";

export type PartyId = string;

export type Party = {
  id: PartyId;
  athleteId: AthleteId;
  monthDayKey: string;
  timeKey: string;
  coords: Coords;
};

export type PartyDraft = {
  monthDayKey?: string;
  timeKey?: string;
  coords?: Coords;
};
