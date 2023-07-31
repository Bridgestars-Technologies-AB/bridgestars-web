export enum ServerEvent {
  UserConnected = "connection",
  Authenticated = "0",
  ChatMessage="1",
  UserIsTyping="2",
  ChatMessageReaction="3",
}

export interface ServerToClientEventTypes {
  [ServerEvent.Authenticated]: () => void;
  [ServerEvent.ChatMessage]: (chatId: string) => void;
  [ServerEvent.UserIsTyping]: (chatId: string, userId:string, typing:boolean) => void;
  [ServerEvent.ChatMessageReaction]: (chatId: string, messageId:string) => void;
}




export enum ClientEvent {
  //signin
  Connected = "connect",
  Disconnected = "disconnect",
  Authenticate = "0",

  //chats
  SubscribeToChats = "1",
  TypingInChat = "2",
  ChatMessage = "3",
  ChatMessageReactedTo = "4",
}
export interface ClientToServerEventTypes {
  [ClientEvent.Authenticate]: (userId: string, sessionId: string) => void;
  [ClientEvent.SubscribeToChats]: (chats: string[]) => void;


  [ClientEvent.ChatMessage]: (chatId: string) => void;
  [ClientEvent.ChatMessageReactedTo]: (chatId: string, messageId: string) => void;
  [ClientEvent.TypingInChat]: (chatId: string, typing: boolean) => void;

}

export interface InterServerEventTypes {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}
