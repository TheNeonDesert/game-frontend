<template>
  <div>
    <h4>ALTAR</h4>
    <p>
      Pray to the Mother. Should your words prove worthy you may receive some
      NEON
    </p>
    <q-btn @click="pray" :loading="praying">pray</q-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import altar from '../../services/altar.service';
import Utils from '../../services/utils';

export default defineComponent({
  name: 'BackpackPage',
  data: function () {
    return {
      praying: false,
    };
  },
  methods: {
    pray: async function () {
      this.praying = true;
      try {
        await altar.pray();
        this.praying = false;
      } catch (err) {
        this.praying = false;
        Utils.error('Error Praying', err);
      }
    },
  },
});
</script>
