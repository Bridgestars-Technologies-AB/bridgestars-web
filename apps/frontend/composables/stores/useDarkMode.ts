import { defineStore } from "pinia";

export default defineStore("darkmode", {
  state: () => ({ value: true, auto: false }), //fix auto-detect
  getters: {
    enabled: (state) => state.value,
  },
  actions: {
    toggle() {
      this.value = !this.value;
    },
    set(value: boolean) {
      this.value = value;
    },
  },
  persist: true,
});
