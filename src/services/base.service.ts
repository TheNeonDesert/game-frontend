// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let window: any;

import { ContractInterface, ethers, Contract } from 'ethers';
import { networkInfo } from './network.info';

export default class BaseService {
  protected signer: ethers.providers.JsonRpcSigner;
  protected contract: Contract;
  protected connectedContract: Contract;
  protected contractAbi: ContractInterface;
  protected contractAddress;

  constructor(contractAddress: string, contractAbi: ContractInterface) {
    this.contractAddress = contractAddress;
    this.contractAbi = contractAbi;

    let provider = new ethers.providers.JsonRpcProvider(
      networkInfo.providerUrl
    );
    if (networkInfo.local)
      provider = new ethers.providers.Web3Provider(window.ethereum);

    this.contract = new ethers.Contract(contractAddress, contractAbi, provider);

    this.signer = new ethers.providers.Web3Provider(
      window.ethereum
    ).getSigner();

    this.connectedContract = this.contract.connect(this.signer);
  }
}
