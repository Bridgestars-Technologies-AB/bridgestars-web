import Chat from "./Chat";
import { Socket } from "../../realtime";

/**
 * This class manages all chats and their messages as an reactive proxy.
 **/
export default class ChatManager {
  readonly socket: Socket;
  readonly chats: { [id: string]: Chat };
  private readonly sorted: ComputedRef<Chat[]>;

  getChatIds = () => Object.keys(this.chats);
  get = (id: string) => this.chats[id];
  sortedChats = () => this.sorted.value;

  constructor(chats: { [id: string]: Chat }, socket: Socket) {
    this.socket = socket;
    this.chats = reactive(chats);
    this.sorted = computed(() =>
      Object.values(this.chats).sort((a, b) => {
        const aT = a.latestMessage?.createdAt?.getTime() || 0;
        const bT = b.latestMessage?.createdAt?.getTime() || 0;
        return bT - aT;
      })
    );
  }
}
