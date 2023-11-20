import { User } from "../models";
import { create } from "zustand";

import * as auth from "parse-sdk-ts/auth";

export type NextAuthStore = State & Actions;

export interface State {
  user: User | null;
}

export interface Actions {
  signIn: (id: string, password: string) => Promise<User>;
  signOut: () => void;
  signUp: (username: string, password: string, email: string) => Promise<User>;
  requestPasswordReset: (email: string) => void;
}

// ladda in user från localstorage på klienten vid reload
const INITIAL_STATE: State = {
  user: auth.current(User),
};

// En lite lurig grej är att sessionen en user får vid inlog kan bli invalid efter ett tag ifall,
// vanligast: vi rensar databasen,
// eller den går ut (typ 30dagar)
// eller vi revokar den eller vad som.
// Och då får man error.code 209 när man anropar databasen. Man kan fånga det över hela klienten med:
//
// if(!isServer){
//   window.onunhandledrejection = (error) => {
//     handleInvalidSessionToken(error)
//   }
//   window.onrejectionhandled = (error) => {
//     handleInvalidSessionToken(error)
//   }
// }
// function handleInvalidSessionToken(error:any){
//   if(error.reason.code == 209){ //invalid session token, could be expired, deleted, revoked or corrupted
//     console.log("Sessionen har avslutats, vänligen logga in igen.")
//     signOut() // ta bort lokal felaktig token
//   }
// }
export const useAuth = create<NextAuthStore>((set, get) => ({
  user: INITIAL_STATE.user,

  signIn: async (id: string, password: string) =>
    await auth.signIn(User, id.toLowerCase().trim(), password)
      .then((u) => {
        set({ user: u });
        return u;
      }),

  signOut: async () =>
    await auth.signOut()
      .then(() => set({ user: null })),

  signUp: async (
    username: string,
    password: string,
    email: string,
  ): Promise<User> =>
    auth.signUp(User, username, password, email)
      .then((u) => {
        set({ user: u });
        return u;
      }),

  requestPasswordReset: async (email: string) =>
    auth.requestPasswordReset(email.trim().toLowerCase()),
}));
