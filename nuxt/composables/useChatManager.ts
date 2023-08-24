import { Attributes } from "parse";
import { Client, Events, Socket } from "../js/realtime";
import useRealtimeClient from "./useRealtimeClient.client";

type DbObject = Parse.Object<Attributes>;
type ChatMap = { [key: string]: Chat };

class Message {
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
      this.createdAt = new Date(); //temp
      // throw new Error("Tried adding message before uploading it to database");
    }
    else this.createdAt = data.createdAt;
  }
}

class Chat {
  readonly id: string;
  readonly data: DbObject;
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
  }

  /**
   * Fetches the name of the chat. If the name is already fetched, it will return the cached name. May run multiple times if called quickly
   * @returns {string} the name of the chat
   */
  async getName() {
    if (this.name) return this.name;
    const otherUser =
      this.users.filter((u: string) => u != useAuth().user.id)[0]; // temp, chats can have 2 users and therefore another name
    await new Parse.Query("_User").select("dispName").get(otherUser).then(
      (u) => {
        this.name = u.get("dispName");
      },
    )
      .catch((e) => {
        console.error("ChatManager error fetching chat name", e);
        throw e;
      });
    return this.name;
  }

  async getLatestMessage() {
    if (this.messages.length == 0) await this.fetchNewerMessages(1);
    this.latestMessage = this.messages[this.messages.length - 1];
    return this.latestMessage;
  }

  sendMessage(text: string) {
    manager?.socket.emit(Events.Send.ChatMessage, this.id);
    this.addMessages([
      new Parse.Object("Message", { text, sender: useAuth().user.id }),
    ]); // temp
  }

  async fetchOlderMessages(limit: number) {
    const base = new Parse.Query("Message").equalTo("chat", this.id).limit(
      limit ?? 10,
    );
    return (this.messages.length == 0
      ? base.descending("createdAt")
      : base.lessThan("createdAt", this.messages[0].data.createdAt).descending(
        "createdAt",
      ))
      .find()
      .then((mx) => this.addMessages(mx));
  }
  async fetchNewerMessages(limit: number) {
    const base = new Parse.Query("Message").equalTo("chat", this.id).limit(
      limit ?? 10,
    );
    return (this.messages.length == 0
      ? base.descending("createdAt")
      : base.greaterThan(
        "createdAt",
        this.messages[this.messages.length - 1].data.createdAt,
      ).ascending("createdAt"))
      .find()
      .then((mx) => this.addMessages(mx));
  }

  private addMessages(m: DbObject[]) {
    m.forEach((m) => this.addMessage(m)); // will sort on every add, we should add an insertion sort function
  }
  addMessage(data: DbObject) {
    if (this.addedMessages.has(data.id)) return; //TODO: does not allow testing with not uploaded messages
    this.addedMessages.add(data.id);
    const m = new Message(data);
    this.messages.push(m);
    this.messages.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    this.latestMessage = m;
    // console.log(this.messages.map(x => x.createdAt))
  }
}

class ChatManager {
  readonly chats: ChatMap;
  readonly socket: Socket;

  getMessages = (chatId: string) => this.chats[chatId];
  getChatIds = () => Object.keys(this.chats);
  get(id: string) {
    return this.chats[id];
  }
  getChats() {
    return Object.values(this.chats);
  }

  constructor(chats: ChatMap, socket: Socket) {
    this.chats = reactive(chats);
    this.socket = socket;
  }
}

let manager: ChatManager | null = null;

let initPromise: Promise<void> | null = null;
let deferred: {
  resolve: () => void;
  reject: (error: Error) => void;
} | null = null;

export default async function useChatManager() {
  if (!initPromise) {
    initPromise = new Promise((resolve, reject) =>
      deferred = { resolve, reject }
    );
    const { socket } = await useRealtimeClient();
    await fetchChats().then((chats) => {
      manager = new ChatManager(chats, socket);
      socket.emit(Events.Send.SubscribeToChats, manager.getChatIds());
      socket.on(Events.Receive.ChatMessage, async (chatId: string) => {
        if (manager == null) {
          throw new Error("this should not happen, chatmanager == null");
        }
        console.log(
          "new message in chat: ",
          chatId,
          await manager.chats[chatId].getName(),
        );

        // console.log("before push", this.getMessages(chatId).length);
        manager.chats[chatId].addMessage(
          new Parse.Object("Message", { text: "new message" }),
        );
        // console.log("after push", this.getMessages(chatId).length);
      });
      deferred?.resolve();
    }).catch((e) => {
      console.error("ChatManager error fetching chats", e);
      deferred?.reject(e);
      throw e;
    });
  }

  await initPromise;
  return manager;
}

// export default defineStore("chatManager", {
//   state: () => ({
//     chats: {} as ChatMap,
//     initialized: false,
//     initializing: false,
//   }),
//   getters: {
//     chatIds: (state) => {
//       return Object.keys(state.chats);
//     },
//   },
//   actions: {
//     get(chatId: string) {
//       return this.chats[chatId];
//     },
//     getMessages(chatId: string) {
//       return this.chats[chatId].messages;
//     },
//     async init() {
//       if (this.initialized) return;
//       this.initialized = true;
//       let socket = await useRealtimeClient();
//
//       await fetchChats().then((chats) => {
//         this.chats = chats;
//         socket.emit(Events.Send.SubscribeToChats, this.chatIds);
//         socket.on(Events.Receive.ChatMessage, async (chatId: string) => {
//           console.log("new message in chat: ", chatId, this.get(chatId).name);
//           const m = await createMessageObject(
//             new Parse.Object("Message", { text: "new message" }),
//           );
//           console.log("before push", this.getMessages(chatId).length);
//           this.getMessages(chatId).push(m);
//           console.log("after push", this.getMessages(chatId).length);
//         });
//       }).catch((e) => {
//         console.error("ChatManager error fetching chats", e);
//         throw e;
//       });
//     },
//
//     async sendMessage(chatId: string, message: string) {
//       console.log("sending message to chat with id", chatId);
//       const socket = useRealtimeClient();
//       socket?.emit(Events.Send.ChatMessage, chatId);
//       //upload message to db
//     },
//   },
//   persist: false, //should encrypt these??
// });

async function fetchChats(): Promise<ChatMap> {
  return new Parse.Query("Chat").equalTo("public", false).find()
    .then((chats: DbObject[]) =>
      Promise.all(chats.map((c: DbObject) => new Chat(c)))
    )
    .then((chats: Chat[]) => {
      const chatMap = {} as ChatMap;
      chats.forEach((c: Chat) => {
        chatMap[c.id] = c;
      });
      return chatMap;
    });
}
