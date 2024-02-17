import { defineStore } from "pinia";
import type { UserData } from "~/types/generated";

const useUserStore = defineStore("user", {
  state: () => ({ user: null as Omit<UserData, "email"> | null }),
  getters: {},
  actions: {
    async update(): Promise<UserData> {
      return api
        .get<UserData>("user")
        .then((response) => {
          /* eslint-disable */
          const temp: any = response.data;
          delete temp.email; // don't store email in cookie
          this.user = response.data as Omit<UserData, "email">;
          /* eslint-enable */
          return response.data;
        })
        .catch((e) => {
          this.user = null;
          useCookie("auth").value = null;
          useCookie("user").value = null;
          throw e;
        });
    },
    delete() {
      this.user = null;
      useCookie("auth").value = null;
      useCookie("user").value = null;
    },
  },
  persist: {
    key: "user",
  },
});

/* eslint-disable @typescript-eslint/unbound-method */
const useAuth = () => {
  const store = useUserStore();

  //const csrf = () => axios.get("sanctum/csrf-cookie");

  const register = async ({ ...props }): Promise<UserData> => {
    return api.post("auth/register", props).then(store.update);
  };

  async function login({ ...props }): Promise<UserData> {
    return api.post("auth/login", props).then(store.update);
  }

  const logout = async () => {
    return api.post("auth/logout").then(store.delete);
  };
  //
  const forgotPassword = async ({ ...props }) => {
    return api.post("auth/forgot-password", props);
  };
  //
  const resetPassword = async ({ ...props }) => {
    return api.post("auth/reset-password", props);
  };

  return {
    user: store.user,
    register,
    login,
    logout,
    forgotPassword,
    resetPassword,
  };
};

export default useAuth;
