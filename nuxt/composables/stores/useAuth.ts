import { defineStore } from "pinia";
import User from "~/js/db/user/User"
/*
 * Minimal auth store that lets the server access information about the user in order to prerender certain routes like dash and navbar,
 * and, lets the server block certain routes like dash if the user is not signed in.
 */
const authStore = defineStore("auth", {
  state: () => ({ username: "" as string }),
  actions: {
    set(username: string) {
      this.username = username;
    },
  },
  persist:true
});

class AuthManager {
  //-------- server / client ----------
  authenticated = () => Boolean(authStore().username);
  username = () => authStore().username;

  //------------ client only -----------
  user = () => {
    const user = Parse.User.current()
    return user ? new User(user) : null;
  }

  signUp = async (username: string, password: string, email: string) => {
    return Parse.User.signUp(username.trim(), password, { email: email.trim() })
      .then(
        (u: any) => {
          authStore().set(u.get("dispName"));
          return u;
        },
      );
  };

  signIn = async (usernameEmail: string, password: string) => {
    //lowercase since neither username or email is case sensitive, and iphone users often write `Username` due to auto-capitalizition
    return Parse.Cloud.run("signIn", {
      email: usernameEmail.toLowerCase().trim(),
      password: password,
    })
      .catch(() => { })
      //sign in client side
      .then(() => Parse.User.logIn(usernameEmail.toLowerCase(), password))
      //success
      .then((user: any) => {
        authStore().set(user.get("dispName"));
        return user;
      });
  };

  signOut = async () => {
    return Parse.User.logOut().then(() => {
      authStore().$reset();
      // ---- update (reset) all managers ----
      useRealtimeClient().catch(() => { });
      useUserManager().catch(() => { });;
      useChatManager().catch(() => { });;
    });
  };
}

const manager = new AuthManager();

export default function useAuth() {
  if (process.client && !manager.user()) {
    authStore().$reset();
  }
  return manager;
}
