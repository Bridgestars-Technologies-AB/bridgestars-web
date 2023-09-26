import { DbObject } from "~/js/db";

export enum Status {
  Offline = 0,
  Online = 1,
  InGame = 2,
  Busy = 3,
}

/**
 *
 * This class represents an user, it is just a wrapper for the database object contained in the data field.
 * We may want to add some methods here later.
 *
 **/
export default class User {
  readonly id: string;
  readonly data: DbObject; //see http://localhost:3000/dev/db-schema#_User
  readonly displayName: string;
  cachedStatus: Status = Status.Offline;
  statusFetchTime: Date = new Date(0);

  constructor(data: DbObject) {
    this.id = data.id;
    this.data = data;
    this.displayName = data.get("dispName") as string;
    if (!data.createdAt) {
      throw new Error(
        "Tried adding an user that does not exist in the database",
      );
    }
  }
}
