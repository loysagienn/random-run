import { CreatePartyParams, Party, Method } from "types";
import { request } from "./request";

export const createParty = async (params: CreatePartyParams): Promise<Party> =>
  request<Party>({
    path: "/api/party",
    method: Method.POST,
    body: params,
  });
