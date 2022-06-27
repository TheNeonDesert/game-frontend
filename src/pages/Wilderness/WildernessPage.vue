<template>
  <div>
    <h4>WILDERNESS</h4>
    <q-btn @click="approveAvatarToForage">approve avatar</q-btn>
    <q-btn @click="forage">forage</q-btn>
    <q-btn @click="completeForage">completeForage</q-btn>
    <div>
      ready to collect:
      <div class="row">...</div>
    </div>
    <br />
    <div>
      on expedition:
      <div class="row">...</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import wilderness from '../../services/wilderness.service';

export default defineComponent({
  name: 'WildernessPage',
  created: async function () {
    void wilderness.foragerDetail();
    void wilderness.myAvatarsAtWilderness();
  },
  methods: {
    forage: async function () {
      await wilderness.forage();
    },

    approveAvatarToForage: async function () {
      await wilderness.approveAvatarToForage();
    },

    completeForage: async function () {
      await wilderness.completeForage();
    },

    // click forage
    // get a modal asking which character you want to send
    // select character
    // click approve button
    // spin and wait
    // then select duration/setting and hit start expedition

    // approveWildernessToTransferAvatar: function () {
    // avatar.approve(
    //   networkInfo.contracts.wilderness,
    //     ethers.utils.parseUnits('1', 18)
    //   );
    // TODO approve wilderness contract to send avatar on user's behalf
    // should be pretty similar to the approve neon call for the erc20, just 721s instead
    // },
  },
});
</script>
