import Axios, { type AxiosResponse } from "axios";
import { defineStore } from "pinia";
import type { UserData } from "~/types/generated";

const axios = Axios.create({
  baseURL: "/api/",
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
  //withXSRFToken: true
});

const useAuthStore = defineStore("auth", {
  state: () => ({ user: null as UserData | null }),
  getters: {},
  actions: {
    async update() : Promise<UserData> {
      return api.get<UserData>("user")
        .then((response) => {
          this.user = response.data;
          return response.data;
        })
        .catch((e) => {
          this.user = null;
          throw e;
        });
    },
  },
  persist: {
    key: "auth",
  },
});

const useAuth = () => {
  const store = useAuthStore();

  const csrf = () => axios.get("sanctum/csrf-cookie");

  const register = async ({ ...props }): Promise<UserData> => {
    return api.post("internal/register", props).then(store.update);
  };

  const login = async ({ ...props }): Promise<UserData> => {
    return api.post("internal/login", props).then(store.update);
  };

  const logout = async () => {
    return await axios.post("logout").then(store.update);
  };

  const forgotPassword = async ({ ...props }) => {
    return await csrf().then(() => axios.post("forgot-password", props));
  };

  const resetPassword = async ({ ...props }) => {
    return await csrf().then(() => axios.post("reset-password", props));
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
