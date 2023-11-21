import { User } from "../models";
import { isServer } from "parse-sdk-ts";
import * as auth from "parse-sdk-ts/auth";
// USED IN TESTING DONT REMOVE, cant use the new hook since we test in node
export function useAuthMock() {
    // -- if client side and not really logged in, ensure the store/server does not think we are signed in --
    if (!isServer && manager.authenticated() && !manager.user()) {
        authStore().reset();
    }
    return manager;
}
/*
 * The AuthManager contains all the logic for signing in, up and out,
 * and for getting the current user's data.
 */
export class AuthManager {
    //-------- server / client ----------
    authenticated() {
        return Boolean(authStore().username);
    }
    username() {
        return authStore().username;
    }
    //------------ client only -----------
    user() {
        return auth.current(User);
    }
    async signUp(username, password, email) {
        return auth.signUp(User, username.trim(), password, email.trim())
            .then((u) => {
            // set auth store so that server knows that we are signed in
            authStore().set(u.username.get());
            return u;
        });
    }
    async signIn(usernameEmail, password) {
        return auth.signIn(User, usernameEmail.toLowerCase().trim(), password)
            // success
            .then((u) => {
            // set auth store so that server knows that we are signed in
            authStore().set(u.username.get());
            return u;
        });
    }
    async signOut() {
        return auth.signOut().then(() => {
            // (Db.CoreManager as any).getUserController().setCurrentUser(null)
            authStore().reset();
            // ---- update manager/remove locally stored data about user ----
            // useRealtimeClient().catch(() => {});
            // useUserManager().catch(() => {});
            // useChatManager().catch(() => {});
        });
    }
    async requestPasswordReset(email) {
        return auth.requestPasswordReset(email);
    }
    constructor() {
        if (!isServer) {
            window.onunhandledrejection = (error) => {
                handleInvalidSessionToken(error);
            };
            window.onrejectionhandled = (error) => {
                handleInvalidSessionToken(error);
            };
        }
    }
}
let mockStoreUsername = "";
const authStore = () => {
    return {
        username: mockStoreUsername,
        set: (username) => mockStoreUsername = username,
        reset: () => mockStoreUsername = "",
    };
};
function handleInvalidSessionToken(error) {
    if (error.reason.code == 209) { //invalid session token, could be expired, deleted, revoked or corrupted
        console.log("Sessionen har avslutats, vänligen logga in igen.");
        manager.signOut();
    }
}
var manager = new AuthManager();
