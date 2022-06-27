import wildernessContract from '../../contract-artifacts/Wilderness.sol/Wilderness.json';
import { networkInfo } from './network.info';
import BaseService from './base.service';
import { BigNumber } from 'ethers';
import avatar from './avatar.service';

class WildernessService extends BaseService {
  constructor() {
    super(networkInfo.contracts.wilderness, wildernessContract.abi);
  }

  async forage(): Promise<void> {
    await this.connectedContract.startForage(BigNumber.from(0x02)); // TODO un-hardcode
  }

  async completeForage(): Promise<void> {
    await this.connectedContract.completeForage(BigNumber.from(0x02)); // TODO un-hardcode
  }

  async approveAvatarToForage(): Promise<void> {
    return avatar.approve(
      networkInfo.contracts.wilderness,
      BigNumber.from(0x02) // TODO un-hardcode
    );
  }

  // mapping(address => mapping(uint256 => bool)) public avatarOwners;
  // mapping(uint256 => ForagingRecord) public activeForagers;

  async myAvatarsAtWilderness(): Promise<void> {
    const signerAddress = await this.signer.getAddress();
    const avatarOwners = await this.connectedContract.getOwnedAvatars(
      signerAddress
    );
    console.log('avatarOwners:', avatarOwners);
  }

  async foragerDetail(): Promise<void> {
    const details = await this.connectedContract.activeForagers(
      BigNumber.from(0x02) // TODO un-hardcode
    );
    this.findEnd(details);
    console.log('details:', details);
  }

  findEnd(details: {
    startTime: BigNumber;
    duration: BigNumber;
    collected: boolean;
  }) {
    const endTimeDate = new Date(
      (parseInt(details.startTime._hex, 16) +
        parseInt(details.duration._hex, 16)) *
        1000
    );
    console.log('endTimeDate:', endTimeDate);
  }
}

export default new WildernessService();

// code to take startTime and duration...

// TODO move to its own function, start immediately, and manage the timeout
// TODO change interval from every x seconds as it gets closer to 60?
// TODO destroy on leave
// TODO watch for event NEW_ACTION or something, so when they start choppin, re-check this manually
// setInterval(() => {
//   // TODO bugfix, if you send on action and they're currently complete, the timer never kicks back in
//   // but if you reload, it's good to go
//   let timeLeft = Math.trunc(
//     (endTimeDate.getTime() - new Date().getTime()) / 1000
//   );

//   let seconds = timeLeft;
//   let displayString = '';
//   if (seconds > 0) {
//     var days = Math.floor(seconds / (24 * 60 * 60));
//     seconds -= days * (24 * 60 * 60);
//     var hours = Math.floor(seconds / (60 * 60));
//     seconds -= hours * (60 * 60);
//     var minutes = Math.floor(seconds / 60);
//     seconds -= minutes * 60;
//     if (days > 0) displayString += `${days}d `;
//     if (hours > 0) displayString += `${hours}h `;
//     if (minutes > 0) displayString += `${minutes}m `;
//     displayString += `${seconds}s`;
//   } else {
//     displayString = 'complete';
//     // TODO check if there are rewards and display link to collect in the UI
//     if (character.currentTask) {
//       this.rewards[addr] = character.currentTask.rewards;
//     }
//   }
//   this.timeLeftTracker[addr] = displayString;
