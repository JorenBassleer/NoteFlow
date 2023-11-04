import { defineStore } from 'pinia';

export const useUsersStore = defineStore('users', {
  state: () => ({
    isLoggedIn: false,
  }),
  getters: {},
  actions: {},
});
