import { defineStore } from "pinia";
import { Attributes } from "parse";

/*
 * This store lets the server access information about the user in order to prerender certain routes like dash and navbar,
 * and, lets the server block certain routes like dash if the user is not signed in.
 */

export default defineStore("auth", {
  //underlying is the actual Parse.User object, but serialized to JSON so it does not contain any methods like set or get or signout
  state: () => ({
   underlying: undefined as {[key:string]:any} | undefined,
  }),
  getters: {
    authenticated: (state) => {
      console.log("authenticated", process.server, state.underlying)
      if(process.server && state.underlying) return true;
      console.log("authenticated", process.client, Parse.User.current())
      if(process.client && Parse.User.current()) return true;
      else return false;
    },
    user: (state) => process.server ? state.underlying : Parse.User.current(), //return the best available representation of the user
  },
  actions: {
    /* wrap user.get() since we sometimes does not have access to methods */
    get(field: string) {
      if (!this.underlying) return undefined;
      return process.server
        ? this.underlying[field]
        : Parse.User.current()?.get(field);
    },
    // if fields are set using Parse.User.current().set(), then we need to update the underlying object, otherwise the server will not have updated values
    // so we wrap the metods of Parse.User in order to keep the state in sync but also because it is more convinient to do `auth.set()`  than `Parse.User.current().set()`
    set(field: string, value: any) {
      if (process.server) throw new Error("Cannot set on server");
      const u = Parse.User.current();
      u?.set(field, value);
      this.underlying = u;
      return u;
    },
    increment(field: string, amount: number) {
      if (process.server) throw new Error("Cannot increment on server");
      const u = Parse.User.current();
      u?.increment(field, amount);
      this.underlying = u;
      return u;
    },
    async signUp(username: string, password: string, email: string) {
      return Parse.User.signUp(username, password, { email: email }).then(
        (u: any) => {
          this.underlying = u;
          return u;
        },
      );
    },
    async signIn(usernameEmail: string, password: string) {
      //lowercase since neither username or email is case sensitive, and iphone users often write `Username` due to auto-capitalizition
      return Parse.Cloud.run("signIn", {
        email: usernameEmail.toLowerCase(),
        password: password,
      })
        .catch(() => {})
        //sign in client side
        .then(() => Parse.User.logIn(usernameEmail.toLowerCase(), password))
        //success
        .then((user: any) => {
          this.underlying = user;
          return user;
        });
    },
    async signOut() {
      this.underlying = undefined;
      return Parse.User.logOut();
    },
  },
  persist: true,
});
