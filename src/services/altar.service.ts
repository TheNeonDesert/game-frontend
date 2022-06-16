import altarContract from '../../contract-artifacts/Altar.sol/Altar.json';
import { networkInfo } from './network.info';
import BaseService from './base.service';

class AltarService extends BaseService {
  constructor() {
    super(networkInfo.contracts.altar, altarContract.abi);
  }

  async pray(): Promise<void> {
    await this.connectedContract.pray();
  }
}

export default new AltarService();
