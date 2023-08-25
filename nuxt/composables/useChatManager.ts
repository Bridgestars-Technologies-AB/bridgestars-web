import { Events, Socket } from "../js/realtime";
import { DbObject } from "../js/db";
import { Chat, ChatManager } from "../js/db/chat";





let manager: ChatManager | null = null;

/**
 * This "hack" is to create an asynchroneus singleton "manager", i'm not 100% sure it's safe though
 **/
let initPromise: Promise<void> | null = null;
let deferred: {
  resolve: () => void;
  reject: (error: Error) => void;
} | null = null;

/**
 *
 *  This is a singleton that manages all chats and their messages.
 *  It will automatically unsure a connection to the realtime server and subscribe to all chats as well as fetch more information from the database. 
 *
 *  @example const manager = await useChatManager();
 *  manager.get("chatId").sendMessage("hello");
 *
 * **/
export default async function useChatManager() : Promise<ChatManager> {
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
  if(!manager) throw new Error("ChatManager is null for some reason, investigate!");
  return manager;
}

async function fetchChats(): Promise<{[id:string]:Chat}> {
  return new Parse.Query("Chat").equalTo("public", false).find()
    .then((chats: DbObject[]) =>
      Promise.all(chats.map((c: DbObject) => new Chat(c)))
    )
    .then((chats: Chat[]) => {
      const chatMap = {} as {[id:string]:Chat}; //Hashmap
      chats.forEach((c: Chat) => {
        chatMap[c.id] = c;
      });
      return chatMap;
    });
}
