import { defineStore } from 'pinia';

export const useGlobalStore = defineStore('global', {
  state: () => ({
    // The global value
    value: null, 
    uname: null,
    email: null,
    admin: false,
    userId: null
  }),
  getters: {
    getValue: (state) => state.value,
    getUname: (state) => state.uname,
    getEmail: (state) => state.email,
    getAdmin: (state) => state.admin,
    getUserId: (state) => state.userId
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
    },
    setUserId(userId) {
      this.userId = userId;
    },
    clear() {
      this.value = null;
      this.uname = null;
      this.email = null;
      this.admin = false;
      this.userId = null;
    }
  },
});
