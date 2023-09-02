import UserManager from "../js/db/user/UserManager";
import { Events } from "../js/realtime";
import User, { Status } from "../js/db/user/User";

let manager: UserManager | null = null;

/**
 * This "hack" is to create an asynchroneus singleton "manager", i'm not 100% sure it's safe though
 */
let initPromise: Promise<void> | null = null;
let deferred: {
  resolve: () => void;
  reject: (error: Error) => void;
} | null = null;

/**
 *  This is a singleton that manages all users and their status.
 *  It will automatically unsure a connection to the realtime server and subscribe to all friends statuses as well as fetch more information from the database.
 *
 *  @example const manager = await useUserManager();
 *  await manager.get("userid") // returns User object and caches it
 *  manager.getStatus("userid"); //returns the cached Status.Offline/Online/InGame etc and requests a new one from the server in the background that transparently updates the cache and triggers re-render
 *
 * **/
export default async function useUserManager(): Promise<UserManager> {
  if(!useAuth().authenticated()) {
    manager = null;
    const e = new Error("Can't initialize user manager when not signed in");
    deferred?.reject(e);
    throw e;
  }
  if (!initPromise) {
    initPromise = new Promise((resolve, reject) =>
      deferred = { resolve, reject }
    );
    const { socket } = await useRealtimeClient();
    const auth = useAuth();
    const user = auth.user();
    if (!user) {
      throw new Error("Can't initialize user manager when not signed in");
    }
    manager = new UserManager(socket, user);

    deferred?.resolve();
    // deferred?.reject(e);
  }

  await initPromise;
  if (!manager) {
    throw new Error("UserManager is null for some reason, investigate!");
  }
  return manager;
}

async function fetchFriends() { //TODO: implement ?

}
