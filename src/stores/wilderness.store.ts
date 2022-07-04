import { defineStore } from 'pinia';
import { Avatar } from './avatar.store';
import { BigNumber } from 'ethers';

export const useWildernessStore = defineStore('wilderness', {
  state: (): WildernessStore => ({
    avatarsForaging: [],
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

export interface WildernessStore {
  avatarsForaging: ForagingAvatar[];
}

export interface ForagingAvatar extends Avatar {
  collected: boolean;
  duration: BigNumber;
  startTime: BigNumber;
  timeRemainingMs: number;
  timeRemainingDisplay?: string;
}
