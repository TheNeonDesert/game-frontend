<template>
  <div>
    <div class="row">
      <div class="col-12 col-md-6">
        <avatar-page />
      </div>
      <div class="col-12 col-md-6">
        <backpack-page />
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6">
        <wilderness-page />
      </div>
      <div class="col-12 col-md-6">
        <altar-page />
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6">
        <div>
          <h4>WISHING WELL</h4>
          <p>Throw your hard earned resources into the well...</p>
          <q-btn>wish</q-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import wallet from '../../services/wallet.service';
import BackpackPage from '../Backpack/BackpackPage.vue';
import AltarPage from '../Altar/AltarPage.vue';
import AvatarPage from '../Avatar/AvatarPage.vue';
import WildernessPage from '../Wilderness/WildernessPage.vue';

export default defineComponent({
  name: 'DashboardPage',
  components: {
    BackpackPage,
    AltarPage,
    AvatarPage,
    WildernessPage,
  },
  setup() {
    return {
      neonTokenBalance: ref<string>(),
      connectedAccount: ref<string | null>(),
    };
  },
  created: async function () {
    this.connectedAccount = await wallet.checkAlreadyConnected();
    if (!this.connectedAccount) {
      let connectedAccounts = await wallet.connectMetamask();
      if (connectedAccounts) this.connectedAccount = connectedAccounts[0];
    }
  },
});
</script>
