
import { Events } from "../../js/realtime-events";
import {io, Socket as _Socket} from "socket.io-client"
import { defineStore } from 'pinia'


type Socket = _Socket<Events.ReceiveTypes, Events.SendTypes>;

export default defineStore("RealtimeClient", {
  state: () => ({
    socket: null as Socket | null,
    connected: false,
  }),
  getters: {

  },
  actions: {
    async connect() : Promise<Socket>{
      if(process.server) throw new Error("Cannot use socket on server");
      if(this.socket !== null && this.connected) return this.socket as Socket;

      const auth = useAuth();
      if(!auth.authenticated || !auth.user) throw new Error("User is not authenticated, cannot connect to realtime-server");




      let deferred: any; //hack so that connect() resolves only when socket has connected
      const p:Promise<Socket> = new Promise((resolve, reject) => {
        deferred = {resolve, reject};
        //set timeout for reject here?
      })
      //create socket
      this.socket = io("http://localhost:3001", {
        transports: ['websocket']
      });

      //connect socket to server
      this.socket.on(Events.Connection.Established, () => {
        console.log("Socket connected")
        if(this.socket === null) throw new Error("Socket is null??");
        //authenticate socket
        this.socket.emit(Events.Send.Authenticate, auth.user.id, auth.user.getSessionToken())
        this.socket.on(Events.Receive.Authenticated, () => {
          this.connected = true;
          deferred.resolve(this.socket);
        })
      })

      //on disconnect or connection lost
      this.socket.on(Events.Connection.Lost, () => {
        this.connected = false;
      })
      //for debug
      this.socket.onAnyOutgoing((event, ...args) => {
        console.log("outgoing", event, args)
      })
      return p;
    },
  }
})
