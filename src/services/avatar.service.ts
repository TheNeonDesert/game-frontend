import { BigNumber } from 'ethers';
import avatarContract from '../../contract-artifacts/Avatar.sol/Avatar.json';
import BaseService from './base.service';
import { networkInfo } from './network.info';
import { AvatarStore, useAvatarStore } from '../stores/avatar.store';

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
          this.connectedAddress === from || this.connectedAddress === to
        );
        if (this.connectedAddress === from || this.connectedAddress === to) {
          setTimeout(() => {
            this.getMyAvatars();
          }, 2000); // TODO wuhh for some reason this isn't working without a delay... is silly
        }
      }
    );
    this.getMyAvatars();
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
      myAvatars.push(
        await this.connectedContract.tokenOfOwnerByIndex(
          this.connectedAddress,
          i
        )
      );
    }
    return (this.avatarStore.avatars = myAvatars);
  }

  async approve(to: string, tokenId: BigNumber): Promise<void> {
    await this.connectedContract.approve(to, tokenId);
  }
}

export default new AvatarService();
