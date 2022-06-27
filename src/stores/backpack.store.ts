import { BigNumber, ethers } from 'ethers';
import { defineStore } from 'pinia';

export const useBackpackStore = defineStore('backpack', {
  state: (): BackpackStore => ({
    neon: BigNumber.from(0),

    stone: BigNumber.from(0),
    stick: BigNumber.from(0),
    plant: BigNumber.from(0),
    apple: BigNumber.from(0),
  }),
  getters: {
    formattedNeon: (state) => ethers.utils.formatEther(state.neon),

    formattedStone: (state) => ethers.utils.formatEther(state.stone),
    formattedStick: (state) => ethers.utils.formatEther(state.stick),
    formattedPlant: (state) => ethers.utils.formatEther(state.plant),
    formattedApple: (state) => ethers.utils.formatEther(state.apple),
  },
  actions: {
    // increment() { this.counter++; },
  },
});

export interface BackpackStore {
  neon: BigNumber;

  stone: BigNumber;
  stick: BigNumber;
  plant: BigNumber;
  apple: BigNumber;

  formattedNeon?: string;

  formattedStone?: string;
  formattedStick?: string;
  formattedPlant?: string;
  formattedApple?: string;
}
