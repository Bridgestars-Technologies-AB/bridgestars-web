import { Attributes } from "parse";
import { defineStore } from "pinia";
import { Events } from "../js/realtime-events";
import useRealtimeClient from "./useRealtimeClient.client";

type DbObject = Parse.Object<Attributes>;
type ChatMap = { [key: string]: Chat };

class Message {
  readonly id: string;
  readonly data: DbObject;
  readonly text: string;
  readonly sender: string;
  constructor(data: DbObject) {
    this.id = data.id;
    this.data = data;
    this.text = data.get("text");
    this.sender = data.get("sender");
  }
}

class Chat {
  readonly id: string;
  readonly data: DbObject;
  readonly messages: Message[];
  readonly users: string[];

  private name: string;

  constructor(data: DbObject) {
    this.id = data.id;
    this.data = data;
    this.messages = [];
    this.users = data.get("users");
    this.name = "";
  }
  addMessage(m:Message){
    this.messages.push(m);
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
}

class ChatManager {
  chats = {} as ChatMap;
  getMessages = (chatId: string) => this.chats[chatId];
  getChatIds = () => Object.keys(this.chats);
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
    manager = new ChatManager();
    await fetchChats().then((chats) => {
      if (manager == null) {
        throw new Error("this should not happen, chatmanager == null");
      }

      manager.chats = chats;
      socket.emit(Events.Send.SubscribeToChats, manager.getChatIds());
      socket.on(Events.Receive.ChatMessage, async (chatId: string) => {
        if (manager == null) {
          throw new Error("this should not happen, chatmanager == null");
        }
        // console.log("new message in chat: ", chatId, this.get(chatId).name);
        const m = new Message(
          new Parse.Object("Message", { text: "new message" }),
        );
        // console.log("before push", this.getMessages(chatId).length);
        manager.chats[chatId].addMessage(m);
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
