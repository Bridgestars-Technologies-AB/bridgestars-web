import { ClientEvent, ServerEvent, ClientToServerEventTypes, ServerToClientEventTypes } from "../js/realtime-events";
import {io, Socket} from "socket.io-client"
import {Parse} from "parse/node"

let socket: Socket<ServerToClientEventTypes, ClientToServerEventTypes>;

export default function useSocket(){
  if(process.server) throw new Error("Cannot use socket on server");
  const auth = useAuth();
  if(!auth.authenticated) throw new Error("User is not authenticated, cannot use socket");
  if(socket == null){
    console.log(socket)
    socket = io("http://localhost:3001", {
      transports: ['websocket']
    });
    socket.on(ClientEvent.Connected, async () => {
      console.log("Socket connected")
      socket.emit(ClientEvent.Authenticate, auth.user.id, auth.user.getSessionToken())
    })
    socket.onAnyOutgoing((event, ...args) => {
      console.log("outgoing", event, args)
    })
  }
  return socket;
}
