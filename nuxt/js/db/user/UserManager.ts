import { Events, Socket } from "../../realtime";
import User, {Status} from "./User";

type UserMap = { [id: string]: User };


/**
 * This class manages all users in an reactive proxy.
 **/
export default class UserManager {
  readonly socket: Socket;
  readonly users: UserMap;
  readonly current: User;
  readonly friends: User[] = [];

  getUserIds = () => Object.keys(this.users);
  get = (id: string) => this.users[id];
  getFriends = () => this.current.data.get("friends") || [];
  getStatus = (id: string) => {
    // send request to get live status and return the cached status in the meantime
    // the user object is reactive so will trigger a re-render when the status is updated
    const user = this.get(id);
    const isSubscribedToStatusUpdate = this.getFriends().includes(id); //not the nicest, maybe usermanager should save current user 
    if(!user || (Date.now() - user.statusFetchTime.getTime() > 1000*60 && !isSubscribedToStatusUpdate)) //if status is 60 seconds old then request the new one, this stops looped rerender
    {
      if(!user) this.getUser(id).then(u => u && this.socket.emit(Events.Send.GetUserStatus, id));
      else {
        // console.log(useTimeAgo().format(Date.now()-user.statusFetchTime.getTime()))
        this.socket.emit(Events.Send.GetUserStatus, id);
      }
    }
    // else console.log("fetching status not needed")
    return this.users[id]?.cachedStatus || Status.Offline;
  };
  setStatus = (status:Status) => {
    this.socket.emit(Events.Send.SetUserStatus, status);
  }


  constructor(socket: Socket, user: User) {
    this.socket = socket;
    this.users = reactive({} as UserMap);
    this.users[user.id] = user;
    this.current = user;
    this.setStatus(Status.Online);
    socket.emit( //TODO: implement
      Events.Send.SubscribeToUserStatus,
      this.getFriends()
    );
    this.initStatusListener();
  }

  async getUser(id: string) {
    if(!id) return null;
    if(!this.users[id]) 
    console.log("fetching user", id)
      new Parse.Query("_User").get(id).then((user) => { //TODO: this will run multiple times if called "fast"
        this.users[id] = new User(user);
      })
      .catch((e) => {
console.log("error getting user", e)
      })
    return this.users[id];
  }
  


  private initStatusListener = () => {
    this.socket.on(Events.Receive.UserStatus, (userId: string, status: number) => {
      if(this.users[userId]) {
        this.users[userId].cachedStatus = status;
        this.users[userId].statusFetchTime = new Date();
      }
    })
  }
}
