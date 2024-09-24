import type { UserData } from "./generated";
/**
 * Configuration for the `local`-provider.
 */
export type ProviderLocal = {
  type: "local"; //Extract<SupportedAuthProviders, 'local'>
  endpoints: {
    signIn: { path: "/login"; method: "post" };
    signOut: { path: "/logout"; method: "post" };
    signUp: { path: "/register"; method: "post" };
    getSession: { path: "/user"; method: "post" };
  };
  pages: {
    login: "/auth/sign-in";
  };
  token: {
    maxAgeInSeconds: 2592000; //30 days
    sameSiteAttribute: "strict"; //boolean | 'lax' | 'strict' | 'none' | undefined,
  };
  sessionDataType: UserData;
};
