import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('global', {
  state: () => ({
    // The global value
    value: null, 
    user: null,
    email: null
  }),
  getters: {
    getValue: (state) => state.value,
    getUser: (state) => state.user,
    getEmail: (state) => state.email
  },
  actions: {
    setValue(newValue) {
      this.value = newValue;
    },
    setUser(user) {
      this.user = user;
    },
    setEmail(email) {
      this.email = email;
    }
  },
});
