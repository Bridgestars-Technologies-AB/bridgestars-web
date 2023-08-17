import { Events } from "../../js/realtime-events";
import { io, Socket as _Socket } from "socket.io-client";

type Socket = _Socket<Events.ReceiveTypes, Events.SendTypes>;
let socket: Socket | null = null;
let deferred: {
  resolve: (socket: Socket) => void;
  reject: (error: Error) => void;
} | null = null;
let connectingPromise: Promise<Socket> | null = null;
let connected = false;

export default function useRealtimeClient(): Promise<Socket> {
  if (process.server) throw new Error("Cannot use socket on server");

  if (connected) return Promise.resolve(socket as Socket);
  if (connectingPromise) return connectingPromise;


  const auth = useAuth();
  if (!auth.authenticated || !auth.user) {
    throw new Error(
      "User is not authenticated, cannot connect to realtime-server",
    );
  }

  //singlethreaded, so this is fine.... right?
  connectingPromise = new Promise((resolve, reject) => {
    deferred = { resolve, reject };
  });

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
      Events.Send.Authenticate,
      auth.user.id,
      auth.user.getSessionToken(),
    );
    socket.on(Events.Receive.Authenticated, () => {
      if (deferred == null) return;
      if (socket == null) deferred.reject(new Error("Socket is null??"));
      else {
        connected = true;
        deferred.resolve(socket);
      }
    });
  });

  //on disconnect or connection lost
  socket.on(Events.Connection.Lost, () => {
    connected = false;
  });
  //for debug
  socket.onAnyOutgoing((event, ...args) => {
    console.log("outgoing", event, args);
  });

  return connectingPromise;
}
