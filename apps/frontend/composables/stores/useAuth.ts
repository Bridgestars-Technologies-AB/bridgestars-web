import { defineStore } from "pinia";
import axios from "@/composables/axios";

const useAuthStore = defineStore("auth", {
  state: () => ({ user: null }),
  getters: {},
  actions: {
    async update(x: any) {
      await axios.get("api/user")
        .then((response) => this.user = response.data)
        .catch((e) => {
          useCookie("XSRF-TOKEN").value = null;
          useCookie("laravel_session").value = null;
          this.user = null;
        });
      return x;
    },
  },
  persist: {
    key: "auth",
  },
});

const useAuth = () => {
  const store = useAuthStore();

  const csrf = () => axios.get("sanctum/csrf-cookie");

  const register = async ({ ...props }) => {
    return await csrf()
      .then(() => axios.post("register", props))
      .then(store.update);
  };

  const login = async ({ ...props }) => {
    return await csrf()
      .then(() => axios.post("login", props))
      .then(store.update);
  };

  const logout = async () => {
    return await axios.post("logout")
      .then(store.update);
  };

  const forgotPassword = async ({ ...props }) => {
    return await csrf()
      .then(() => axios.post("forgot-password", props));
  };

  const resetPassword = async ({ ...props }) => {
    return await csrf()
      .then(() => axios.post("reset-password", props));
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
