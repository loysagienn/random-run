import type { ParameterizedContext, Next } from "koa";
import type { DbInstance } from "server/db";
import type { Route } from "./router";
import type { State } from "./store";
import type { Session } from "./session";
import type { StravaCredentials, Athlete } from "./strava";
import type { Api } from "./api";

export type AppState = {
  route: Route;
  initialState: State;
  session: Session;
  api: Api;
  stravaCredentials?: StravaCredentials;
  athlete?: Athlete;
};

export type AppContextExtend = {
  db: DbInstance;
};

export type AppContext = ParameterizedContext<AppState, AppContextExtend>;

export type AppNext = Next;
