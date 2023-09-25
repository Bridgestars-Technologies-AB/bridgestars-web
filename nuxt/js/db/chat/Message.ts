import { DbObject } from "~/js/db";

/**
 *
 * This class represents a chat message, it contains the text, sender and time of the message.
 * It also contains the actual database object. "data"
 **/
export default class Message {
  readonly id: string;
  readonly data: DbObject; //see http://localhost:3000/dev/db-schema#Message
  readonly text: string;
  readonly sender: string;
  readonly createdAt: Date;
  constructor(data: DbObject) {
    this.id = data.id;
    this.data = data;
    this.text = data.get("text") as string;
    this.sender = data.get("sender") as string;
    if (!data.createdAt) {
      this.createdAt = new Date(); //temp?
      // throw new Error("Tried adding message before uploading it to database");
    } else this.createdAt = data.createdAt;
  }
}
