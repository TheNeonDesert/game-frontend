import avatarContract from '../../contract-artifacts/Avatar.sol/Avatar.json';
import BaseService from './base.service';
import { networkInfo } from './network.info';

class AvatarService extends BaseService {
  constructor() {
    super(networkInfo.contracts.avatar, avatarContract.abi);
  }

  async generateAvatar(name: string): Promise<any> {
    const avatar = this.connectedContract.generateCharacter(name);
    return avatar;
  }

  async getMyAvatars(): Promise<any[]> {
    const signerAddress = await this.signer.getAddress();
    const avatarCount = (
      await this.connectedContract.balanceOf(signerAddress)
    ).toNumber();
    const myAvatars = [];
    for (let i = 0; i < avatarCount; i++) {
      myAvatars.push(
        await this.connectedContract.tokenOfOwnerByIndex(signerAddress, i)
      );
    }
    return myAvatars;
  }
}

export default new AvatarService();
