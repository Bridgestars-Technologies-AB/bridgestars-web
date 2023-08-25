import { DbObject } from "~/js/db";

export default class Message {
  readonly id: string;
  readonly data: DbObject;
  readonly text: string;
  readonly sender: string;
  readonly createdAt: Date;
  constructor(data: DbObject) {
    this.id = data.id;
    this.data = data;
    this.text = data.get("text");
    this.sender = data.get("sender");
    if (!data.createdAt) {
      this.createdAt = new Date(); //temp?
      // throw new Error("Tried adding message before uploading it to database");
    } else this.createdAt = data.createdAt;
  }
}
