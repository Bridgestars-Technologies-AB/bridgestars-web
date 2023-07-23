
import { defineStore } from 'pinia'

export default defineStore('auth', {
  state: () => ({ underlying:undefined}), //fix auto-detect
  getters: {
    authenticated: (state) => state.underlying !== undefined,
    user: (state) => process.server ? state.underlying : Parse.User.current(), //server will only have access to data, no methods
  },
  actions: {
    get(field:string){
      if(!this.underlying) return undefined;
      return process.server ? this.underlying[field] : Parse.User.current().get(field);
    },
    async signUp(username:string, password:string, email:string){
      return Parse.User.signUp(username, password, {email:email}).then((u:any) => {this.underlying = u; return u;});
    },
    async signIn(usernameEmail:string, password:string) {
      return Parse.Cloud.run('signIn', { email:usernameEmail, password:password})
        .catch(() => {})
        //sign in client side
        .then(() => Parse.User.logIn(usernameEmail, password))
        //success
        .then((user:any) => {
          this.underlying = user;
          return user;
        });
    },
    async signOut() {
      return Parse.User.logOut().then(() => {this.underlying = undefined})
    }
  },
  persist:true,
})
