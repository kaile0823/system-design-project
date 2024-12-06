import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('global', {
  state: () => ({
    // The global value
    value: null, 
    uname: null,
    email: null,
    admin: false
  }),
  getters: {
    getValue: (state) => state.value,
    getUname: (state) => state.uname,
    getEmail: (state) => state.email,
    getAdmin: (state) => state.admin
  },
  actions: {
    setValue(newValue) {
      this.value = newValue;
    },
    setUname(uname) {
      this.uname = uname;
    },
    setEmail(email) {
      this.email = email;
    },
    setAdmin(admin) {
      this.admin = admin;
    }
  },
});
