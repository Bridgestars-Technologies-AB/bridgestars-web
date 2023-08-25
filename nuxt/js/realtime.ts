/**
 * This file contains the types for the realtime communication between the client and the server.
 **/
export namespace Events{
  export enum Send {
    Authenticate = "0",
    //chats
    SubscribeToChats = "1",
    TypingInChat = "2",
    ChatMessage = "3",
    ChatMessageReactedTo = "4",
  }
  export enum Receive {
    Authenticated = "0",
    ChatMessage="1",
    UserIsTyping="2",
    ChatMessageReaction="3",
  }
  export enum Connection {
    Established = "connect",
    Lost = "disconnect",
  }
  export interface ReceiveTypes {
    [Receive.Authenticated]: () => void;
    [Receive.ChatMessage]: (chatId: string) => void;
    [Receive.UserIsTyping]: (chatId: string, userId:string, typing:boolean) => void;
    [Receive.ChatMessageReaction]: (chatId: string, messageId:string) => void;
  }

  export interface SendTypes {
    [Send.Authenticate]: (userId: string, sessionId: string) => void;
    //chats
    [Send.SubscribeToChats]: (chats: string[]) => void;
    [Send.ChatMessage]: (chatId: string) => void;
    [Send.ChatMessageReactedTo]: (chatId: string, messageId: string) => void;
    [Send.TypingInChat]: (chatId: string, typing: boolean) => void;
  }

}

export interface SocketData {
  name: string;
  age: number;
}

import {Socket as _Socket} from "socket.io-client";
export type Socket = _Socket<Events.ReceiveTypes, Events.SendTypes>;
export type Client = {socket: Socket, connected: Ref<Boolean>};

