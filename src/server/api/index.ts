import type { Api, AppContext } from "types";
import { createParty } from "./createParty";

export const initApi = (ctx: AppContext): Api => ({
  createParty: createParty(ctx),
});
