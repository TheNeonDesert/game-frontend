import { defineStore } from 'pinia';

export const useAvatarStore = defineStore('avatar', {
  state: () => ({
    avatars: [],
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2,
  },
  actions: {
    // increment() {
    //   this.counter++;
    // },
  },
});
