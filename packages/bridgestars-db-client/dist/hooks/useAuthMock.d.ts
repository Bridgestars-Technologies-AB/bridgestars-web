import { User } from "../models";
export declare function useAuthMock(): AuthManager;
export declare class AuthManager {
    authenticated(): boolean;
    username(): string;
    user(): User | null;
    signUp(username: string, password: string, email: string): Promise<User>;
    signIn(usernameEmail: string, password: string): Promise<User>;
    signOut(): Promise<void>;
    requestPasswordReset(email: string): Promise<void>;
    constructor();
}
