import { DbObject } from "~/js/db/index";
import Message from "./Message";
import { Events } from "~/js/realtime";

/**
 *
 * This class represents a chat, it contains all messages and users in the chat.
 * It also contains methods for sending messages and fetching more messages.
 *
 * @example const chat = await manager.get("chatId");
 * chat.getLatestMessage(); // Promise<"hello?">
 * chat.sendMessage("hello");
 **/
export default class Chat {
  private manager: any | null = null;
  readonly id: string;
  readonly data: DbObject; //see http://localhost:3000/dev/db-schema#Chat
  private readonly addedMessages = new Set();
  readonly messages: Message[];
  readonly users: string[];
  latestMessage: Message | null = null;

  private name: string;

  constructor(data: DbObject) {
    this.id = data.id;
    this.data = data;
    this.messages = [];
    this.users = data.get("users");
    this.name = "";
    (async () => (this.manager = await useChatManager()))();
  }

  /**
   * Fetches the name of the chat. If the name is already fetched, it will return the cached name. May run multiple times if called quickly
   * @returns the name of the chat
   */
  async getName(): Promise<string> {
    if (this.name) return this.name;
    const otherUser = this.users.filter(
      (u: string) => u != useAuth().user.id,
    )[0]; // temp, chats can have 2 users and therefore another name
    await new Parse.Query("_User")
      .select("dispName")
      .get(otherUser)
      .then((u) => {
        this.name = u.get("dispName");
      })
      .catch((e) => {
        console.error("ChatManager error fetching chat name", e);
        throw e;
      });
    return this.name;
  }
  async getLastUpdateTime(): Promise<Date> {
    if (this.messages.length === 0) await this.fetchNewerMessages(1);
    return this.messages[this.messages.length - 1].createdAt;
  }

  async getLatestMessage(): Promise<Message> {
    if (this.messages.length === 0) await this.fetchNewerMessages(1); // could still be called twice if called quickly, would be nice with an easy way to let all other requests wait for the first. btw same problem as in usechatmanager and userealtimeclient.
    this.latestMessage = this.messages[this.messages.length - 1];
    return this.latestMessage;
  }

  async sendMessage(text: string): Promise<Message | null> {
    this.manager?.socket.emit(Events.Send.ChatMessage, this.id);
    const m = new Parse.Object("Message", {
      text,
      chat: this.id,
      sender: useAuth().user.id,
    });
    const M = this.addMessage(m);
    return m.save().then((_) => M);
  }

  async fetchOlderMessages(limit: number): Promise<void> {
    const base = new Parse.Query("Message")
      .equalTo("chat", this.id)
      .limit(limit ?? 10);
    return (
      this.messages.length === 0
        ? base.descending("createdAt")
        : base
            .lessThan("createdAt", this.messages[0].data.createdAt)
            .descending("createdAt")
    )
      .find()
      .then((mx) => this.addMessages(mx));
  }
  async fetchNewerMessages(limit: number) {
    const base = new Parse.Query("Message")
      .equalTo("chat", this.id)
      .limit(limit ?? 10);
    return (
      this.messages.length == 0
        ? base.descending("createdAt")
        : base
            .greaterThan(
              "createdAt",
              this.messages[this.messages.length - 1].data.createdAt,
            )
            .ascending("createdAt")
    )
      .find()
      .then((mx) => this.addMessages(mx));
  }

  private addMessages(m: DbObject[]) {
    m.forEach((m) => this.addMessage(m)); // will sort on every add, we should add an insertion sort function
  }
  addMessage(data: DbObject): Message | null {
    if (this.addedMessages.has(data.id)) return null; //TODO: does not allow testing with not uploaded messages
    this.addedMessages.add(data.id);
    const m = new Message(data);
    this.messages.push(m);
    this.messages.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    this.latestMessage = m;
    return m;
    // console.log(this.messages.map(x => x.createdAt))
  }
}
