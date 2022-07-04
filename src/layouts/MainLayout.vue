<template>
  <q-layout view="hhh lpr fff">
    <q-header>
      <q-toolbar>
        <q-toolbar-title> The Neon Desert </q-toolbar-title>

        <button @click="connect">connect</button>
      </q-toolbar>
    </q-header>

    <q-page-container v-if="isSmartBrowser">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Notify } from 'quasar';

import wallet from '../services/wallet.service';
import { networkInfo } from 'src/services/network.info';

export default defineComponent({
  name: 'MainLayout',

  data: function () {
    return {
      isSmartBrowser: false,
    };
  },

  // TODO create smartBrowser check and wallet and network and etc...

  created: async function () {
    wallet.onChainChanged(async () => {
      console.log('wallet.onChainChanged:');
      const isRightNetwork = await wallet.isRightNetwork();
      if (!isRightNetwork) {
        // this.wrongNetworkModal = true;
        Notify.create({
          type: 'negative',
          message: `Wrong network, connect to ${networkInfo.chainName}`,
        });
        return;
      }
    });

    wallet.onAccountsChanged(async (accounts: Array<string>) => {
      console.log('wallet.onAccountsChanged:');
      if (accounts.length == 0) {
        // this.connectToWalletModal = true;
        console.log('connectToWalletModal:');
      } else {
        const connectedAccount = await wallet.checkAlreadyConnected();
        if (connectedAccount) {
          console.log('connectedAccount:', connectedAccount);
          // await this.saveConnectedAccount(connectedAccount);
        } else {
          // this.connectToWalletModal = true;
          console.log('connectToWalletModal:');
        }
      }
    });

    this.isSmartBrowser = wallet.checkBrowser();
    // console.log('isSmartBrowser:', isSmartBrowser);
    if (!this.isSmartBrowser) {
      // this.noSmartBrowserModal = true;
      Notify.create({
        type: 'negative',
        message: 'Need smart browser',
      });
      return;
    }

    const isRightNetwork = await wallet.isRightNetwork();
    if (!isRightNetwork) {
      // this.wrongNetworkModal = true;
      Notify.create({
        type: 'negative',
        message: `Wrong network, connect to ${networkInfo.chainName}`,
      });
      return;
    }

    try {
      const connectedAccount = await wallet.checkAlreadyConnected();
      if (connectedAccount) {
        // console.log('connectedAccount:', connectedAccount);
        // await this.saveConnectedAccount(connectedAccount);
      } else {
        // this.connectToWalletModal = true;
        console.log('else connectToWalletModal:');
      }
    } catch (err) {
      console.log('err:', err);
      Notify.create({
        type: 'negative',
        message: err as string,
      });
    }
  },
});
</script>
