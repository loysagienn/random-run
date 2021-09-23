import { MongoClient } from "mongodb";
import type { Db } from "mongodb";
import { DB_ID, DB_URL } from "config";
import * as requests from "./requests";

type RequestKeys = keyof typeof requests;

export type DbInstance = {
  [key in RequestKeys]: ReturnType<typeof requests[key]>;
};

const initInstance = (db: Db): DbInstance =>
  Object.entries(requests).reduce(
    (acc, [key, request]) => ({ ...acc, [key]: request(db) }),
    {} as DbInstance
  );

let instance: DbInstance | null = null;

export const getDbInstance = async (): Promise<DbInstance> => {
  if (!instance) {
    const client = await MongoClient.connect(DB_URL, {
      connectTimeoutMS: 3000,
    });

    const db = client.db(DB_ID);

    instance = initInstance(db);
  }

  return instance;
};
