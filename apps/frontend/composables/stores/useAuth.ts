
import { defineStore } from "pinia";
import axios from "@/composables/axios"

const useAuthStore = defineStore("auth", {
  state: () => ({ user: null }), //fix auto-detect
  getters: {
    //enabled: (state) => state.value,
  },
  actions: {
    async update() {
      axios.get("api/user").then((response) => {
        this.user = response.data;
      }).catch(() => this.user = null);
    }
  },
  persist: true,
});


const useAuth = () => {
  const store = useAuthStore();
  const csrf = () => axios.get("sanctum/csrf-cookie");

  const register = async ({ ...props }) => {
    return await csrf()
      .then(() => axios.post("register", props))
      .then(() => store.update())
  }

  const login = async ({ ...props }) => {
    return await csrf()
      .then(() => axios.post("login", props))
      .then(() => store.update())
  };

  const logout = async () => {
    return await axios.post("logout")
        .then(() => store.update());
  }

  const forgotPassword = async ({ ...props }) => {
    return await csrf()
      .then(() => axios.post("forgot-password", props))
  }


  return { user: store.user, register, login, logout, forgotPassword }
}

export default useAuth;
