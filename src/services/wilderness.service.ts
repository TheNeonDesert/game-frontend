import wildernessContract from '../../contract-artifacts/Wilderness.sol/Wilderness.json';
import { networkInfo } from './network.info';
import BaseService from './base.service';
import { BigNumber } from 'ethers';
import avatar from './avatar.service';
import {
  WildernessStore,
  useWildernessStore,
  ForagingAvatar,
} from '../stores/wilderness.store';
import avatarService from './avatar.service';

class WildernessService extends BaseService {
  private wildernessStore: WildernessStore;

  constructor() {
    super(networkInfo.contracts.wilderness, wildernessContract.abi);
    this.wildernessStore = useWildernessStore();
    setInterval(() => {
      this.keepAvatarDurationsUpdated();
    }, 1000);
  }

  async forage(tokenId: BigNumber): Promise<void> {
    await this.connectedContract.startForage(BigNumber.from(tokenId));
  }

  async completeForage(tokenId: BigNumber): Promise<void> {
    await this.connectedContract.completeForage(BigNumber.from(tokenId));
  }

  async approveAvatarToForage(tokenId: BigNumber): Promise<void> {
    return avatar.approve(
      networkInfo.contracts.wilderness,
      BigNumber.from(tokenId)
    );
  }

  async isAvatarApproved(tokenId: BigNumber): Promise<boolean> {
    const approvedAddress = await avatar.getApproved(tokenId);
    return networkInfo.contracts.wilderness === approvedAddress;
  }

  async myAvatarsAtWilderness(): Promise<ForagingAvatar[]> {
    const signerAddress = await this.signer.getAddress();
    const avatarOwners = (await this.connectedContract.getOwnedAvatars(
      signerAddress
    )) as BigNumber[];
    const myAvatars = [];
    for (let i = 0; i < avatarOwners.length; i++) {
      const avatar = await avatarService.getAvatarDetails(avatarOwners[i]);

      const foragerDetail = await this.connectedContract.activeForagers(
        // TODO rename activeForagers on contract
        avatarOwners[i]
      );
      myAvatars.push({ ...avatar, ...foragerDetail });
    }
    return (this.wildernessStore.avatarsForaging = myAvatars);
  }

  keepAvatarDurationsUpdated() {
    // code to take startTime and duration...
    // TODO maybe move this somewhere?
    // TODO move to its own function, start immediately, and manage the timeout
    // TODO change interval from every x seconds as it gets closer to 60?
    // TODO destroy on leave
    // TODO watch for event NEW_ACTION or something, so when they start choppin, re-check this manually
    // setInterval(() => {
    //   // TODO bugfix, if you send on action and they're currently complete, the timer never kicks back in
    //   // but if you reload, it's good to go
    if (this.wildernessStore) {
      for (let i = 0; i < this.wildernessStore.avatarsForaging.length; i++) {
        const avatar = this.wildernessStore.avatarsForaging[i];
        const endTimeDate = new Date(
          (parseInt(avatar.startTime._hex, 16) +
            parseInt(avatar.duration._hex, 16)) *
            1000
        );
        const timeLeftMs = endTimeDate.getTime() - new Date().getTime();
        let seconds = Math.trunc(timeLeftMs / 1000);
        let displayString = '';
        if (seconds > 0) {
          const days = Math.floor(seconds / (24 * 60 * 60));
          seconds -= days * (24 * 60 * 60);
          const hours = Math.floor(seconds / (60 * 60));
          seconds -= hours * (60 * 60);
          const minutes = Math.floor(seconds / 60);
          seconds -= minutes * 60;
          if (days > 0) displayString += `${days}d `;
          if (hours > 0) displayString += `${hours}h `;
          if (minutes > 0) displayString += `${minutes}m `;
          displayString += `${seconds}s`;
        } else {
          displayString = 'complete';
        }
        this.wildernessStore.avatarsForaging[i].timeRemainingMs = timeLeftMs;
        this.wildernessStore.avatarsForaging[i].timeRemainingDisplay =
          displayString;
      }
    }
  }
}

export default new WildernessService();
