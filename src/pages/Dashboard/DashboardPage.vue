<template>
  <div style="min-height: 80vh">
    <div class="row" style="height: 40vh">
      <div class="col-6">
        <p>AVATARS</p>
        <q-btn @click="showNewAvatarModal = true" :disabled="!hasEnough"
          >create avatar</q-btn
        >
        <q-btn @click="approveNeonForAvatar" :disabled="hasEnough"
          >approve neon</q-btn
        >
        <div class="row" v-for="avatar of myAvatars" v-bind:key="avatar">
          <div class="col-4">Avatar NFT id: {{ avatar }}</div>
        </div>
      </div>
      <div class="col-6">
        <backpack-page />
      </div>
    </div>
    <div class="row" style="height: 40vh">
      <div class="col-6">
        <p>WILDERNESS</p>
        <q-btn>forage</q-btn>
        <div>
          ready to collect:
          <div class="row"></div>
        </div>
        <br />
        <div>
          on expedition:
          <div class="row"></div>
        </div>
      </div>
      <div class="col-6">
        <altar-page />
      </div>
    </div>

    <q-dialog v-model="showNewAvatarModal">
      <q-card>
        <q-card-section>
          <div class="text-h6">
            Avatar Name<q-icon class="q-mx-sm" name="info"> </q-icon>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input v-model="newAvatarName" autofocus />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Add Avatar" v-close-popup @click="createAvatar" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { ethers } from 'ethers';
import { defineComponent, ref } from 'vue';

import wallet from '../../services/wallet.service';
import avatar from '../../services/avatar.service';
import neonToken from '../../services/neon-token.service';
import { networkInfo } from 'src/services/network.info';

import BackpackPage from '../Backpack/BackpackPage.vue';
import AltarPage from '../Altar/AltarPage.vue';

export default defineComponent({
  name: 'DashboardPage',
  components: {
    BackpackPage,
    AltarPage,
  },
  setup() {
    return {
      neonTokenBalance: ref<string>(),
      connectedAccount: ref<string | null>(),
      newAvatarName: ref<string>(''),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      myAvatars: ref<Array<any>>(),
      showNewAvatarModal: ref(false),
      hasEnough: ref(false),
    };
  },
  created: async function () {
    this.connectedAccount = await wallet.checkAlreadyConnected();
    if (!this.connectedAccount) {
      let connectedAccounts = await wallet.connectMetamask();
      if (connectedAccounts) this.connectedAccount = connectedAccounts[0];
    }

    if (this.connectedAccount) {
      void neonToken.myBalance(this.connectedAccount);
    }

    this.myAvatars = await avatar.getMyAvatars();

    // allowed neon for avatar to spend on behalf of user
    const allowedNeon = await neonToken.myAllowance(
      networkInfo.contracts.avatar
    );
    this.hasEnough = allowedNeon.gte(ethers.utils.parseUnits('1', 18));
  },
  methods: {
    approveNeonForAvatar: async function () {
      if (neonToken)
        neonToken.approve(
          networkInfo.contracts.avatar,
          ethers.utils.parseUnits('1', 18)
        );
    },

    createAvatar: async function () {
      const newAvatar = await avatar.generateAvatar(this.newAvatarName);
      await newAvatar.wait();
      this.myAvatars = await avatar.getMyAvatars();
    },
  },
});
</script>
