import Koa from "koa";
import bodyParser from "koa-bodyparser";
import { AppContext, AppState, AppNext } from "types";
import { getDbInstance } from "server/db";
import { sendStatic } from "./static";
import { router } from "./router";
import { initialState } from "./initialState";
import { session } from "./session";
import { authStrava } from "./authStrava";
import { stravaOauth } from "./stravaOauth";
import { stravaCredentials } from "./stravaCredentials";
import { athlete } from "./athlete";
import { html } from "./html";
import { withApi } from "./withApi";
import { api } from "./api";
import { errorHandler } from "./errorHandler";

type Params = {
  httpPort: number;
};

const logState = async (ctx: AppContext, next: AppNext) => {
  console.log(ctx.state);

  return next();
};

export async function initApp({ httpPort }: Params) {
  const app = new Koa<AppState, AppContext>();

  app.context.db = await getDbInstance();

  app.use(sendStatic);
  app.use(bodyParser());
  app.use(errorHandler);
  app.use(withApi);
  app.use(session);
  app.use(router);
  app.use(stravaCredentials);
  app.use(athlete);
  app.use(authStrava);
  app.use(stravaOauth);
  app.use(api);
  app.use(initialState);
  app.use(html);

  app.use(logState);

  app.listen(httpPort);
}
