import type { Party } from "./party";
import type { Coords } from "./common";

export type CreatePartyParams = {
  monthDayKey: string;
  timeKey: string;
  coords: Coords;
};

export type Api = {
  createParty: (data: CreatePartyParams) => Promise<Party>;
};

export enum Method {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
}

export type RequestQuery = {
  [key: string]: string | number;
};

export type RequestBody = object;
