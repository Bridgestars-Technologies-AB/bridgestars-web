import { Attributes } from "parse";
import { defineStore } from "pinia";
import { Events } from "../../js/realtime-events";

type DbObject = Parse.Object<Attributes>;
type Message = {
  id: string;
  data: DbObject;
  text: string;
  sender: string;
};
type Chat = {
  id: string;
  data: DbObject;
  messages: Message[];
  name: string;
  users: string[];
};
type ChatMap = { [key: string]: Chat };

export default defineStore("chatManager", {
  state: () => ({
    chats: {} as ChatMap,
    initialized: false,
    initializing: false,
  }),
  getters: {
    chatIds: (state) => {
      return Object.keys(state.chats);
    },
  },
  actions: {
    get(chatId: string) {
      return this.chats[chatId];
    },
    getMessages(chatId: string) {
      return this.chats[chatId].messages;
    },
    async init() {
      if (this.initialized) return;
      this.initialized = true;
      let socket = await useRealtimeClient().connect();

      await fetchChats().then((chats) => {
        this.chats = chats;
        socket.emit(Events.Send.SubscribeToChats, this.chatIds);
        socket.on(Events.Receive.ChatMessage, async (chatId: string) => {
          console.log("new message in chat: ", chatId, this.get(chatId).name);
          const m = await createMessageObject(
            new Parse.Object("Message", { text: "new message" }),
          );
          console.log("before push", this.getMessages(chatId).length);
          this.getMessages(chatId).push(m);
          console.log("after push", this.getMessages(chatId).length);
        });
      }).catch((e) => {
        console.error("ChatManager error fetching chats", e);
        throw e;
      });
    },

    async sendMessage(chatId: string, message: string) {
      console.log("sending message to chat with id", chatId);
      const socket = useRealtimeClient().socket;
      socket?.emit(Events.Send.ChatMessage, chatId);
      //upload message to db
    },
  },
  persist: false, //should encrypt these??
});

async function createChatObject(raw: DbObject): Promise<Chat> {
  const auth = useAuth();
  const chat = {} as Chat;
  chat.id = raw.id;
  chat.data = raw;
  chat.messages = [];
  chat.users = raw.get("users");
  const otherUser = chat.users.filter((u: string) => u != auth.user.id)[0]; // temp, chats can have 2 users and therefore another name
  await new Parse.Query("_User").select("dispName").get(otherUser).then((u) => {
    chat.name = u.get("dispName");
  })
    .catch((e) => {
      console.error("ChatManager error fetching chat name", e);
      throw e;
    });
  return chat;
}
async function createMessageObject(raw: DbObject): Promise<Message> {
  const message = {} as Message;
  message.id = raw.id;
  message.data = raw;
  message.text = raw.get("text");
  message.sender = raw.get("sender");
  return message;
}

async function fetchChats(): Promise<ChatMap> {
  return new Parse.Query("Chat").equalTo("public", false).find()
    .then((chats: DbObject[]) =>
      Promise.all(chats.map((c: DbObject) => createChatObject(c)))
    )
    .then((chats: Chat[]) => {
      const chatMap = {} as ChatMap;
      chats.forEach((c: Chat) => {
        chatMap[c.id] = c;
      });
      return chatMap;
    });
}
