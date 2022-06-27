import neonTokenContract from '../../contract-artifacts/NeonToken.sol/NeonToken.json';
import resourceTokenContract from '../../contract-artifacts/MockResourceToken.sol/MockResourceToken.json';
import { BigNumber } from 'ethers';
import BaseService from './base.service';
import { networkInfo } from './network.info';
import { BackpackStore, useBackpackStore } from '../stores/backpack.store';

class TokenService extends BaseService {
  private backpackStore: BackpackStore;

  private resourceTokens: { [name: string]: ResourceTokenService } = {};

  constructor() {
    super(networkInfo.contracts.neonToken, neonTokenContract.abi);
    this.backpackStore = useBackpackStore();

    const resources = [
      {
        addr: networkInfo.contracts.stoneToken,
        abi: resourceTokenContract.abi,
        name: 'stone',
      },
      {
        addr: networkInfo.contracts.stickToken,
        abi: resourceTokenContract.abi,
        name: 'stick',
      },
      {
        addr: networkInfo.contracts.plantToken,
        abi: resourceTokenContract.abi,
        name: 'plant',
      },
      {
        addr: networkInfo.contracts.appleToken,
        abi: resourceTokenContract.abi,
        name: 'apple',
      },
    ];

    for (let i = 0; i < resources.length; i++) {
      this.resourceTokens[resources[i].name] = new ResourceTokenService(
        resources[i].addr,
        resources[i].abi,
        resources[i].name
      );
    }
  }

  protected async init(): Promise<void> {
    this.contract.on(
      'Transfer',
      (from: string, to: string, value: BigNumber) => {
        if (this.connectedAddress === from || this.connectedAddress === to) {
          void this.myBalance();
        }
      }
    );
    void this.myBalance();
  }

  public onApproval(
    spenderAddress: string,
    callback: (value: BigNumber) => void
  ): void {
    this.contract.on(
      'Approval',
      (owner: string, spender: string, value: BigNumber) => {
        if (this.connectedAddress === owner && spenderAddress === spender) {
          callback(value);
        }
      }
    );
  }

  async myBalance(): Promise<BigNumber> {
    if (!this.connectedAddress)
      throw Error('Unable to get balance. No connected wallet');
    return (this.backpackStore.neon = await this.contract.balanceOf(
      this.connectedAddress
    ));
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
  private backpackStore: BackpackStore;
  public name: string;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(address: string, abi: any, name: string) {
    super(address, abi);

    this.backpackStore = useBackpackStore();
    this.name = name; // TODO cleanup and test against
  }

  protected async init(): Promise<void> {
    this.contract.on(
      'Transfer',
      async (from: string, to: string, value: BigNumber) => {
        if (this.connectedAddress === from || this.connectedAddress === to) {
          void this.myBalance();
        }
      }
    );
    void this.myBalance();
  }

  async myBalance(): Promise<BigNumber> {
    if (!this.connectedAddress)
      throw Error('Unable to get balance. No connected wallet');
    const balance = await this.contract.balanceOf(this.connectedAddress);

    // TODO better way?
    switch (this.name) {
      case 'stone':
        this.backpackStore.stone = balance;
        break;
      case 'stick':
        this.backpackStore.stick = balance;
        break;
      case 'plant':
        this.backpackStore.plant = balance;
        break;
      case 'apple':
        this.backpackStore.apple = balance;
        break;
    }
    return balance;
  }
}

export default new TokenService();

/**
 * @dev Emitted when the allowance of a `spender` for an `owner` is set by
 * a call to {approve}. `value` is the new allowance.
 */
//  event Approval(address indexed owner, address indexed spender, uint256 value);

/**
 * @dev Emitted when `value` tokens are moved from one account (`from`) to
 * another (`to`).
 *
 * Note that `value` may be zero.
 */
// event Transfer(address indexed from, address indexed to, uint256 value);
