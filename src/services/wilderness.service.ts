import wildernessContract from '../../contract-artifacts/Wilderness.sol/Wilderness.json';
import { networkInfo } from './network.info';
import BaseService from './base.service';

class WildernessService extends BaseService {
  constructor() {
    super(networkInfo.contracts.wilderness, wildernessContract.abi);
  }

  async forage(): Promise<void> {
    await this.connectedContract.forage();
  }
}

export default new WildernessService();
