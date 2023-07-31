

import { Attributes } from 'parse';
import { defineStore } from 'pinia'
import {ClientEvent} from "../../js/realtime-events"


export default defineStore('chats', {
  state: () => ({chats:[] as Parse.Object<Attributes>[]}), 
  getters: {
  },
  actions: {
    async fetchChats(){
      return new Parse.Query("Chat").equalTo("public", false).find().then(chats => {
        this.chats = chats;
        return chats;
      })
    },
    async sendMessage(chatId:string, message:string){
      console.log("sending message to chat with id", chatId)
      const socket = useSocket();
      socket.emit(ClientEvent.ChatMessage, chatId);
    }
  },
  persist:false, //should encrypt these??
})
