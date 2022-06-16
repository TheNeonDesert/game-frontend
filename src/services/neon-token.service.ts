import tokenContract from '../../contract-artifacts/NeonToken.sol/NeonToken.json';
import { BigNumber } from 'ethers';
import BaseService from './base.service';
import { networkInfo } from './network.info';
import { IBackpack, useBackpackStore } from '../stores/backpack.store';

class TokenService extends BaseService {
  private backpack: IBackpack;

  constructor() {
    super(networkInfo.contracts.neonToken, tokenContract.abi);
    this.backpack = useBackpackStore();
  }

  async myBalance(address: string): Promise<BigNumber> {
    return (this.backpack.neon = await this.contract.balanceOf(address));
  }

  async approve(spender: string, amount: BigNumber): Promise<void> {
    await this.connectedContract.approve(spender, amount);
  }

  // Returns the remaining number of tokens that `spender` will be
  //   allowed to spend on behalf of `owner` through {transferFrom}
  async allowance(owner: string, spender: string): Promise<BigNumber> {
    return await this.contract.allowance(owner, spender);
  }

  async myAllowance(spender: string): Promise<BigNumber> {
    const signerAddress = await this.signer.getAddress();
    return this.contract.allowance(signerAddress, spender);
  }
}

export default new TokenService();
