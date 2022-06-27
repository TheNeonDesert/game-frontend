import { defineStore } from 'pinia';
import { BigNumber } from 'ethers';

export const useAvatarStore = defineStore('avatar', {
  state: (): AvatarStore => ({
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

export interface AvatarStore {
  avatars: Avatar[];
}

export interface Avatar {
  tokenId: BigNumber;
  name: string;
}
