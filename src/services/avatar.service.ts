import { BigNumber } from 'ethers';
import avatarContract from '../../contract-artifacts/Avatar.sol/Avatar.json';
import BaseService from './base.service';
import { networkInfo } from './network.info';
import { Avatar, AvatarStore, useAvatarStore } from '../stores/avatar.store';

class AvatarService extends BaseService {
  private avatarStore: AvatarStore;

  constructor() {
    super(networkInfo.contracts.avatar, avatarContract.abi);
    this.avatarStore = useAvatarStore();
  }

  protected async init(): Promise<void> {
    this.contract.on(
      'Transfer',
      (from: string, to: string, tokenId: BigNumber) => {
        console.log(
          'Transfer:',
          this.connectedAddress,
          from,
          to,
          tokenId,
          this.connectedAddress === from || this.connectedAddress === to
        );
        if (this.connectedAddress === from || this.connectedAddress === to) {
          setTimeout(() => {
            this.getMyAvatars();
          }, 2000); // TODO wuhh for some reason this isn't working without a delay... is silly
          // TODO maybe I should just make a new event at the very end of the start/change/end expedition, in wilderness
        }
      }
    );
    this.getMyAvatars();
  }

  public onApproval(
    spenderAddress: string,
    callback: (value: BigNumber) => void
  ): void {
    this.contract.on(
      'Approval',
      (owner: string, approved: string, tokenId: BigNumber) => {
        if (this.connectedAddress === owner) {
          callback(tokenId);
        }
      }
    );
  }

  async generateAvatar(name: string): Promise<any> {
    const avatar = this.connectedContract.generateCharacter(name);
    return avatar;
  }

  async getMyAvatars(): Promise<any[]> {
    if (!this.connectedAddress)
      throw Error('Unable to get Avatars. No connected wallet');
    const avatarCount = (
      await this.connectedContract.balanceOf(this.connectedAddress)
    ).toNumber();
    const myAvatars = [];
    for (let i = 0; i < avatarCount; i++) {
      const tokenId = await this.connectedContract.tokenOfOwnerByIndex(
        this.connectedAddress,
        i
      );
      const avatar = await this.getAvatarDetails(tokenId);
      myAvatars.push(avatar);
    }
    return (this.avatarStore.avatars = myAvatars);
  }

  async approve(to: string, tokenId: BigNumber): Promise<void> {
    await this.connectedContract.approve(to, tokenId);
  }

  async getApproved(tokenId: BigNumber): Promise<string> {
    return this.connectedContract.getApproved(tokenId);
  }

  async getAvatarDetails(tokenId: BigNumber): Promise<Avatar> {
    return this.connectedContract.getAvatarDetails(tokenId);
  }
}

export default new AvatarService();
