import type { Coords } from "./common";

export type PartyId = string;

export type Party = {
  id: PartyId;
  date: string;
  coords: Coords;
};

export type PartyDraft = {
  monthDayKey?: string;
  timeKey?: string;
  coords?: Coords;
};
