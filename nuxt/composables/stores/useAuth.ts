import { defineStore } from "pinia";
import User from "~/js/db/user/User";
/*
 * Minimal auth store that lets the server access information about the user in order to prerender certain routes like dash and navbar,
 * and, lets the server block certain routes like dash if the user is not signed in.
 */

// TODO maybe rebuild this as an regular class that has an store, which lets the store be simpler and we can have more startup logic, for example removing underlying if Parse.User.current() is not available.
export default defineStore("auth", {
  //underlying is the actual Parse.User object, but serialized to JSON so it does not contain any methods like set or get or signout
  state: () => ({ underlying: undefined }),
  getters: {
    authenticated: (state) => state.underlying !== undefined,
    user: (state) => (process.server ? state.underlying : Parse.User.current()), //return the best available representation of the user
  },
  actions: {
    set(username: string) {
      this.username = username;
    },
  },
  persist: true, // store data in local cookie, possibly not needed since Parse.User.current() is already saved
});

/*
 * The AuthManager contains all the logic for signing in, up and out,
 * and for getting the current user data.
 *
 * */
class AuthManager {
  //-------- server / client ----------
  authenticated = () => Boolean(authStore().username);
  username = () => authStore().username;

  //------------ client only -----------
  user = () => {
    const user = Parse.User.current();
    return user ? new User(user) : null; // wrap Parse.User in User class for uniformity with UserManager
  };

  signUp = async (username: string, password: string, email: string) => {
    return Parse.User.signUp(username.trim(), password, {
      email: email.trim(),
    }).then((u: any) => {
      authStore().set(u.get("dispName"));
      return u;
    });
  };

  signIn = async (usernameEmail: string, password: string) => {
    // first run signin function in cloud to possibly migrate from old database if needed
    return (
      Parse.Cloud.run("signIn", {
        // lowercase since neither username or email is case sensitive, and iphone users often write `Username` due to auto-capitalizition
        email: usernameEmail.toLowerCase().trim(),
        password: password,
      })
        .catch(() => {}) // catch errors and find them again when we try to sign in from client
        // sign in client side
        .then(() => Parse.User.logIn(usernameEmail.toLowerCase(), password))
        // success
        .then((user: any) => {
          authStore().set(user.get("dispName")); // set auth store so that server knows that we are signed in
          return user;
        })
    );
  };

  signOut = async () => {
    return Parse.User.logOut().then(() => {
      authStore().$reset();
      // ---- update manager/remove locally stored data about user ----
      useRealtimeClient().catch(() => {});
      useUserManager().catch(() => {});
      useChatManager().catch(() => {});
    });
  };
}

const manager = new AuthManager();

export default function useAuth() {
  if (process.client && !manager.user()) {
    // -- if client side and not really logged in, ensure the store/server does not think we are signed in --
    authStore().$reset();
  }
  return manager;
}
