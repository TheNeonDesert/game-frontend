import { BigNumber, ethers } from 'ethers';
import { defineStore } from 'pinia';

export const useBackpackStore = defineStore('backpack', {
  state: (): IBackpack => ({
    neon: BigNumber.from(0),
  }),
  getters: {
    formattedNeon: (state) => ethers.utils.formatEther(state.neon),
  },
  actions: {
    // increment() { this.counter++; },
  },
});

export interface IBackpack {
  neon: BigNumber;

  formattedNeon?: string;
}
