import avatarContract from '../../contract-artifacts/Avatar.sol/Avatar.json';
import BaseService from './base.service';
import { networkInfo } from './network.info';

class AvatarService extends BaseService {
  constructor() {
    super(networkInfo.contracts.avatar, avatarContract.abi);
  }

  async generateCharacter(name: string): Promise<any> {
    const avatar = this.connectedContract.generateCharacter(name);
    return avatar;
  }

  async getMyCharacters(): Promise<any[]> {
    const signerAddress = await this.signer.getAddress();
    const characterCount = (
      await this.connectedContract.balanceOf(signerAddress)
    ).toNumber();
    const myCharacters = [];
    for (let i = 0; i < characterCount; i++) {
      myCharacters.push(
        await this.connectedContract.tokenOfOwnerByIndex(signerAddress, i)
      );
    }
    return myCharacters;
  }
}

export default new AvatarService();
