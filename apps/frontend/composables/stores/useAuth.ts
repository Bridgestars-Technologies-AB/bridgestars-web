import { defineStore } from "pinia";
import { Auth } from "bridgestars-db-client";
/*
 * Minimal auth store that lets the server access information about the user in order to prerender certain routes like dash and navbar,
 * and, lets the server block certain routes like dash if the user is not signed in.
 */

const authStore = defineStore("auth", {
  state: () => ({ username: "" as string }),
  actions: {
    async signUp(username: string, password: string, email: string) {
      return Auth.signUp(username.trim(), password, email.trim())
        .then((u) => {
          this.username = u.username.get();
          return u;
        });
    },

    async signIn(usernameEmail: string, password: string) {
      return Auth.signIn(usernameEmail.toLowerCase(), password)
        .then((user) => {
          this.username = user.username.get();
          return user;
        });
    },

    async signOut() {
      return Auth.signOut()
        .then(() => {
          authStore().$reset();
          // ---- update manager/remove locally stored data about user ----
          // useRealtimeClient().catch(() => { });
          // useUserManager().catch(() => { });
          // useChatManager().catch(() => { });
        });
    },
    async requestPasswordReset(email: string) {
      return Auth.requestPasswordReset(email);
    }
  },
  getters: {
    //-------- server / client ----------
    authenticated: ({ username }) => Boolean(username),

    //------------ client only -----------
    user: () => Auth.current(),
  },
  persist: true, // store data in local cookie, possibly not needed since Parse.User.current() is already saved
});

export default function useAuth() {
  // store has username but user is not signed in
  if (process.client && !Auth.current()) {
    // -- if client side and not really logged in, ensure the store/server does not think we are signed in --
    authStore().$reset();
  }
  return authStore();
}
