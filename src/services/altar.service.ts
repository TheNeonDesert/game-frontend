import altarContract from '../../contract-artifacts/Altar.sol/Altar.json';
import { networkInfo } from './network.info';
import BaseService from './base.service';
import { ethers, BigNumber } from 'ethers';
import Utils from './utils';

class AltarService extends BaseService {
  constructor() {
    super(networkInfo.contracts.altar, altarContract.abi);
  }

  protected async init(): Promise<void> {
    this.contract.on(
      'PrayingComplete',
      (to: string, qtyReceived: BigNumber) => {
        if (this.connectedAddress === to) {
          Utils.success(
            `Praying Complete: Received ${ethers.utils.formatEther(
              qtyReceived
            )} NEON`
          );
        }
      }
    );
  }

  async pray(): Promise<void> {
    await this.connectedContract.pray();
  }
}

export default new AltarService();
