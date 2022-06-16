<template>
  <div style="min-height: 80vh">
    <div class="row" style="height: 40vh">
      <div class="col-6">
        <p>CHARACTERS</p>
        <q-btn @click="showNewCharacterModal = true" :disabled="!hasEnough"
          >create character</q-btn
        >
        <q-btn @click="approveNeonForCharacter" :disabled="hasEnough"
          >approve neon</q-btn
        >
        <div
          class="row"
          v-for="character of myCharacters"
          v-bind:key="character"
        >
          <div class="col-4">Avatar NFT id: {{ character }}</div>
        </div>
      </div>
      <div class="col-6">
        <p>INVENTORY</p>

        <div class="row">
          <div class="col-4">NEON</div>
          <div class="col-4">{{ backpack?.formattedNeon }}</div>
        </div>
      </div>
    </div>
    <div class="row" style="height: 40vh">
      <div class="col-6">
        <p>WILDERNESS faaaaaake</p>
        <q-btn>forage</q-btn>
        <div>
          ready to collect:
          <div class="row">
            <div class="col-4">Character C</div>
            <a href="javascript:void(0)" class="col-4">collect</a>
          </div>
        </div>
        <br />
        <div>
          on expedition:
          <div class="row">
            <div class="col-4">Character B</div>
            <div class="col-4">foraging (2h)</div>
          </div>
        </div>
      </div>
      <div class="col-6">
        <p>ALTAR</p>
        <q-btn @click="pray">pray</q-btn>
      </div>
    </div>

    <q-dialog v-model="showNewCharacterModal">
      <q-card>
        <q-card-section>
          <div class="text-h6">
            Character Name<q-icon class="q-mx-sm" name="info"> </q-icon>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input v-model="newCharacterName" autofocus />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn
            flat
            label="Add Character"
            v-close-popup
            @click="createCharacter"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts">
import { ethers } from 'ethers';
import { defineComponent, ref } from 'vue';
import { Notify } from 'quasar';

import wallet from '../../services/wallet.service';
import avatar from '../../services/avatar.service';
import altar from '../../services/altar.service';
import neonToken from '../../services/neon-token.service';
import { networkInfo } from 'src/services/network.info';
import { IBackpack, useBackpackStore } from 'src/stores/backpack.store';

export default defineComponent({
  name: 'DashboardPage',
  setup() {
    return {
      neonTokenBalance: ref<string>(),
      connectedAccount: ref<string | null>(),
      newCharacterName: ref<string>(''),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      myCharacters: ref<Array<any>>(),
      showNewCharacterModal: ref(false),
      hasEnough: ref(false),
      backpack: ref<IBackpack>(),
    };
  },
  created: async function () {
    this.backpack = useBackpackStore();

    this.connectedAccount = await wallet.checkAlreadyConnected();
    if (!this.connectedAccount) {
      let connectedAccounts = await wallet.connectMetamask();
      if (connectedAccounts) this.connectedAccount = connectedAccounts[0];
    }

    if (this.connectedAccount) {
      void neonToken.myBalance(this.connectedAccount);
    }

    this.myCharacters = await avatar.getMyCharacters();

    // allowed neon for avatar to spend on behalf of user
    const allowedNeon = await neonToken.myAllowance(
      networkInfo.contracts.avatar
    );
    this.hasEnough = allowedNeon.gte(ethers.utils.parseUnits('1', 18));
  },
  methods: {
    approveNeonForCharacter: async function () {
      if (neonToken)
        neonToken.approve(
          networkInfo.contracts.avatar,
          ethers.utils.parseUnits('1', 18)
        );
    },

    createCharacter: async function () {
      const newAvatar = await avatar.generateCharacter(this.newCharacterName);
      await newAvatar.wait();
      this.myCharacters = await avatar.getMyCharacters();
    },

    pray: async function () {
      await altar.pray();
      // wait for event and update balance
      Notify.create('Praying Complete');
    },
  },
});
</script>
