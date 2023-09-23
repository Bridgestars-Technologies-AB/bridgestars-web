/**
 * This file contains the types for the realtime communication between the client and the server.
 **/
export namespace Events {
  export enum Send {
    //chats
    SubscribeToChats = "1",
    TypingInChat = "2",
    ChatMessage = "3",
    ChatMessageReactedTo = "4",

    GetUserStatus = "5",
    SetUserStatus = "6",
    SubscribeToUserStatus = "7",
  }
  export enum Receive {
    ChatMessage = "1",
    UserIsTyping = "2",
    ChatMessageReaction = "3",

    UserStatus = "4",
  }
  export enum Connection {
    Authenticated = "a1",
    Authenticate = "a2",
    Established = "connect",
    Lost = "disconnect",
  }

  export interface SendTypes {
    [Connection.Authenticate]: (userId: string, sessionId: string) => void;
    //chats
    [Send.SubscribeToChats]: (chats: string[]) => void;
    [Send.ChatMessage]: (chatId: string) => void;
    [Send.ChatMessageReactedTo]: (chatId: string, messageId: string) => void;
    [Send.TypingInChat]: (chatId: string, typing: boolean) => void;

    [Send.GetUserStatus]: (userId: string) => void;
    [Send.SetUserStatus]: (status: number) => void;
    [Send.SubscribeToUserStatus]: (userIds: string[]) => void;
  }

  export interface ReceiveTypes {
    [Connection.Authenticated]: () => void;
    [Receive.ChatMessage]: (chatId: string) => void;
    [Receive.UserIsTyping]: (
      chatId: string,
      userId: string,
      typing: boolean,
    ) => void;
    [Receive.ChatMessageReaction]: (chatId: string, messageId: string) => void;

    [Receive.UserStatus]: (userId: string, status: number) => void;
  }
}

export interface SocketData {
  name: string;
  age: number;
}

import { Socket as _Socket } from "socket.io-client";
export type Socket = _Socket<Events.ReceiveTypes, Events.SendTypes>;
export type Client = { socket: Socket; connected: Ref<Boolean> };
