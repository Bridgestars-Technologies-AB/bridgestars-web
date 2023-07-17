
import { defineStore } from 'pinia'

export default defineStore('auth', {
  state: () => ({ user:undefined }), //fix auto-detect
  getters: {
    authenticated: (state) => state.user !== undefined,
  },
  actions: {
    signUp(username:string, password:string, email:string){
      return Parse.User.signUp(username, password, {email:email}).then((u:any) => {this.user = u; return u;});
    },
    signIn(usernameEmail:string, password:string) {
      return Parse.Cloud.run('signIn', { email:usernameEmail, password:password})
        .catch(() => {})
        //sign in client side
        .then(() => Parse.User.logIn(usernameEmail, password))
        //success
        .then((user:any) => {
          this.user = user;
          return user;
        });
    },
    signOut() {
      return Parse.User.logOut().then(() => {this.user = undefined})
    }
  },
  persist:true,
})
