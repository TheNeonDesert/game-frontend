import neonTokenContract from '../../contract-artifacts/NeonToken.sol/NeonToken.json';
import resourceTokenContract from '../../contract-artifacts/MockResourceToken.sol/MockResourceToken.json';
import { BigNumber } from 'ethers';
import BaseService from './base.service';
import { networkInfo } from './network.info';
import { IBackpack, useBackpackStore } from '../stores/backpack.store';

class TokenService extends BaseService {
  private backpack: IBackpack;

  private stoneToken: ResourceTokenService;
  private stickToken: ResourceTokenService;
  private plantToken: ResourceTokenService;
  private appleToken: ResourceTokenService;

  constructor() {
    super(networkInfo.contracts.neonToken, neonTokenContract.abi);
    this.backpack = useBackpackStore();

    // TODO clean up a bit
    this.stoneToken = new ResourceTokenService(
      networkInfo.contracts.stoneToken,
      resourceTokenContract.abi
    );
    this.stickToken = new ResourceTokenService(
      networkInfo.contracts.stickToken,
      resourceTokenContract.abi
    );
    this.plantToken = new ResourceTokenService(
      networkInfo.contracts.plantToken,
      resourceTokenContract.abi
    );
    this.appleToken = new ResourceTokenService(
      networkInfo.contracts.appleToken,
      resourceTokenContract.abi
    );
  }

  async myBalance(address: string): Promise<BigNumber> {
    return (this.backpack.neon = await this.contract.balanceOf(address));
  }

  async myResourceBalance(address: string, token: string): Promise<BigNumber> {
    switch (token) {
      case 'stone':
        return (this.backpack.stone = await this.stoneToken.myBalance(address));
      case 'stick':
        return (this.backpack.stick = await this.stickToken.myBalance(address));
      case 'plant':
        return (this.backpack.plant = await this.plantToken.myBalance(address));
      case 'apple':
        return (this.backpack.apple = await this.appleToken.myBalance(address));
      default:
        throw Error(`Unknown requested token${token}`);
    }
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

class ResourceTokenService extends BaseService {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(address: string, abi: any) {
    super(address, abi);
  }

  async myBalance(address: string): Promise<BigNumber> {
    return this.contract.balanceOf(address);
  }
}

export default new TokenService();
