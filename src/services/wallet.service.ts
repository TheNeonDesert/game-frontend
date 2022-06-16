/* eslint-disable @typescript-eslint/no-explicit-any */
declare let window: any;

import { ethers } from 'ethers';
import { networkInfo } from './network.info';

class WalletService {
  private provider!: ethers.providers.Web3Provider;
  private chainId!: number;

  constructor() {
    if (!window.ethereum) return;
    this.provider = new ethers.providers.Web3Provider(window.ethereum, 'any');
    this.chainId = networkInfo.chainId;
  }

  onAccountsChanged(callback: any): void {
    if (!window.ethereum) return;
    window.ethereum.on('accountsChanged', callback);
  }

  onChainChanged(callback: any): void {
    if (!window.ethereum) return;
    window.ethereum.on('chainChanged', callback);
  }

  checkBrowser(): boolean {
    return window.ethereum !== undefined;
  }

  async isRightNetwork(): Promise<boolean> {
    const network = await this.provider.getNetwork();
    return network.chainId == this.chainId;
  }

  async connectToNetwork(): Promise<void> {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x' + this.chainId.toString(16) }],
      });
    } catch (err) {
      if ((err as any)['code'] === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: networkInfo.chainId,
                rpcUrls: networkInfo.rpcUrls,
                chainName: networkInfo.chainName,
                nativeCurrency: networkInfo.nativeCurrency,
              },
            ],
          });
          await this.connectMetamask();
        } catch (addError) {
          throw `Game only available on ${networkInfo.chainName} - please connect to ${networkInfo.chainName}`;
        }
      } else {
        throw (err as any).message ? (err as any).message : err;
      }
    }
  }

  async checkAlreadyConnected(): Promise<string | null> {
    if (this.provider) {
      const alreadyConnected = await this.provider.listAccounts();
      if (alreadyConnected && alreadyConnected[0]) {
        return alreadyConnected[0];
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  async connectMetamask(): Promise<string[]> {
    try {
      const connectedAccount = (await window.ethereum.request({
        method: 'eth_requestAccounts',
      })) as string[];
      return connectedAccount;
    } catch (err) {
      let errorMessage = 'Error connecting to Wallet';
      if (err && (err as Error).message) {
        errorMessage = (err as Error).message;
      }
      throw errorMessage;
    }
  }
}

export default new WalletService();
