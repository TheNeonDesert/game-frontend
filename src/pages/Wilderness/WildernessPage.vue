<template>
  <div>
    <h4>WILDERNESS</h4>
    <q-btn @click="showForageModal = true">new foraging expedition</q-btn>
    <div class="q-mt-md">
      <div
        class="row"
        v-for="avatar of wildernessStore?.avatarsForaging"
        v-bind:key="avatar.tokenId?.toString()"
      >
        <div v-if="avatar.timeRemainingDisplay == 'complete'">
          {{ avatar.tokenId.toString() }}: {{ avatar.name }} -
          <q-btn @click="completeForage(avatar.tokenId)">collect</q-btn>
        </div>
        <div v-else>
          {{ avatar.tokenId.toString() }}: {{ avatar.name }} -
          {{ avatar.timeRemainingDisplay }}
        </div>
      </div>
    </div>
  </div>

  <q-dialog v-model="showForageModal">
    <q-card>
      <q-card-section>
        <div class="text-h6">Forage</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-select
          filled
          v-model="selectedAvatar"
          :options="avatarStore?.avatars"
          label="Avatar to send"
        />
      </q-card-section>

      <q-card-actions align="right" class="text-primary">
        <q-btn flat label="Cancel" v-close-popup />
        <q-btn
          label="Approve Sending Avatar"
          v-if="!avatarApproved"
          @click="approveAvatarToForage"
          :loading="approving"
        />
        <q-btn
          label="Forage"
          v-close-popup
          v-if="avatarApproved"
          @click="forage"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import wilderness from '../../services/wilderness.service';
import avatar from '../../services/avatar.service';
import { Avatar, AvatarStore, useAvatarStore } from 'src/stores/avatar.store';
import {
  WildernessStore,
  useWildernessStore,
} from 'src/stores/wilderness.store';
import { networkInfo } from 'src/services/network.info';
import { BigNumber } from 'ethers';

export default defineComponent({
  name: 'WildernessPage',
  setup() {
    return {
      showForageModal: ref(false),
      avatarApproved: ref(false),
      avatarStore: ref<AvatarStore>(),
      wildernessStore: ref<WildernessStore>(),
      approving: ref(false),
      selectedAvatar: ref<Avatar>(),
    };
  },
  created: async function () {
    this.avatarStore = useAvatarStore();
    this.wildernessStore = useWildernessStore();
    void wilderness.myAvatarsAtWilderness();

    avatar.onApproval(networkInfo.contracts.wilderness, this.getApprovedStatus);
  },
  methods: {
    forage: async function () {
      if (this.selectedAvatar) {
        await wilderness.forage(this.selectedAvatar.tokenId);
      }
    },

    approveAvatarToForage: async function () {
      if (this.selectedAvatar) {
        await wilderness.approveAvatarToForage(this.selectedAvatar.tokenId);
        this.approving = true;
      }
    },

    completeForage: async function (tokenId: BigNumber) {
      await wilderness.completeForage(tokenId);
    },

    getApprovedStatus: async function () {
      if (this.selectedAvatar) {
        this.avatarApproved = await wilderness.isAvatarApproved(
          this.selectedAvatar.tokenId
        );
      }
    },
  },
});
</script>
