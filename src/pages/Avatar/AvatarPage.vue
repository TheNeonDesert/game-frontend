<template>
  <div>
    <h4>AVATARS</h4>
    <q-btn @click="showNewAvatarModal = true">create</q-btn>
    <div
      class="row"
      v-for="avatar of avatarStore?.avatars"
      v-bind:key="avatar.tokenId?.toString()"
    >
      <div class="col-4">{{ avatar.name }}</div>
    </div>
  </div>

  <q-dialog v-model="showNewAvatarModal">
    <q-card>
      <q-card-section>
        <div class="text-h6">Create Avatar</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-input v-model="newAvatarName" autofocus placeholder="Name" />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn
          label="Approve Spending"
          v-if="!enoughNeonApproved"
          @click="approveNeonForAvatar"
          :loading="approving"
        />
        <q-btn
          label="Create Avatar"
          v-close-popup
          v-if="enoughNeonApproved"
          @click="createAvatar"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { BigNumber, ethers } from 'ethers';
import { defineComponent, ref } from 'vue';
import neonToken from '../../services/neon-token.service';
import avatar from '../../services/avatar.service';
import { networkInfo } from 'src/services/network.info';
import { Avatar, AvatarStore, useAvatarStore } from 'src/stores/avatar.store';

export default defineComponent({
  name: 'AvatarPage',
  setup() {
    return {
      neonTokenBalance: ref<string>(),
      connectedAccount: ref<string | null>(),
      newAvatarName: ref<string>(''),
      myAvatars: ref<Array<Avatar>>(),
      showNewAvatarModal: ref(false),
      enoughNeonApproved: ref(false),
      avatarStore: ref<AvatarStore>(),
      approving: ref(false),
    };
  },
  data: function () {
    return {};
  },
  created: async function () {
    this.avatarStore = useAvatarStore();

    neonToken.onApproval(
      networkInfo.contracts.avatar,
      this.updateApprovedNeonForAvatar
    );
    void this.updateApprovedNeonForAvatar(
      await neonToken.myAllowance(networkInfo.contracts.avatar)
    );
  },
  methods: {
    updateApprovedNeonForAvatar: async function (allowedNeon: BigNumber) {
      this.enoughNeonApproved = allowedNeon.gte(
        ethers.utils.parseUnits('1', 18)
      );
      this.approving = false;
    },

    approveNeonForAvatar: async function () {
      // TODO catch error, throw toast, and remove loader
      neonToken.approve(
        networkInfo.contracts.avatar,
        ethers.utils.parseUnits('1', 18)
      );
      this.approving = true;
    },

    createAvatar: async function () {
      const newAvatar = await avatar.generateAvatar(this.newAvatarName);
      await newAvatar.wait();
    },
  },
});
</script>
