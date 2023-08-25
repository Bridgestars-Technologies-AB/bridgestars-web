import { Events, Socket, Client } from "../js/realtime";
import { io, Socket as _Socket } from "socket.io-client";

let socket: Socket | null = null;

let deferred: {
  resolve: () => void;
  reject: (error: Error) => void;
} | null = null;
let connectionPromise: Promise<void> | null = null;
let connected = ref(false);

/**
 * Lazily connects to the realtime-server and authenticates the user. Only ever creates one connection.
 * @returns a promise that resolves when the client is connected and authenticated
 * @example
 * const {socket, connected} = await useRealtimeClient();
 * socket.on(Events.Receive.ChatMessage, (chatId: string) => {});
*/
export default async function useRealtimeClient(): Promise<Client> {

  //stop server and unauithenticated users
  if (process.server) throw new Error("Cannot use socket on server");
  const auth = useAuth();
  if (!auth.authenticated || !auth.user) {
    socket?.disconnect();
    const e = new Error(
      "User is not authenticated, cannot connect to realtime-server",
    );
    deferred?.reject(e);
    throw e;
  }

  // detta ska vara en spärr som ser till att det bara finns en socket och att ingen behöver ora sig för att den inte ska vara ansluten när de börjar använda den.
  // är lite orolig för race etc här
  if (!connectionPromise) {
    connectionPromise = new Promise((resolve, reject) => deferred = { resolve, reject });
    connect(auth.user);
  }


  await connectionPromise;
  return {socket: socket as Socket, connected};
}


function connect(user:any){
  //create socket
  socket = io("http://localhost:3001", {
    transports: ["websocket"],
  });

  //connect socket to server
  socket.on(Events.Connection.Established, () => {
    console.log("Socket connected");
    if (socket === null) throw new Error("Socket is null??");
    //authenticate socket
    socket.emit(
      Events.Connection.Authenticate,
      user.id,
      user.getSessionToken(),
    );
    socket.on(Events.Connection.Authenticated, () => {
      if (deferred == null) return;
      if (socket == null) deferred.reject(new Error("Socket is null??"));
      else {
        connected.value = true;
        deferred.resolve();
      }
    });
  });

  //on disconnect or connection lost
  socket.on(Events.Connection.Lost, () => {
    connected.value = false;
  });
  //for debug
  socket.onAnyOutgoing((event, ...args) => {
    console.log("outgoing", event, args);
  });
  socket.onAny((event, ...args) => {
    console.log("incoming", event, args);
  })
}
