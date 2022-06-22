<template>
  <div>
    <p>ALTAR</p>
    <q-btn @click="pray">pray - get 1 free NEON</q-btn>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { IBackpack, useBackpackStore } from 'src/stores/backpack.store';
import { Notify } from 'quasar';
import altar from '../../services/altar.service';

export default defineComponent({
  name: 'BackpackPage',
  setup() {
    return {
      backpack: ref<IBackpack>(),
    };
  },
  created: async function () {
    this.backpack = useBackpackStore();
  },
  methods: {
    pray: async function () {
      await altar.pray();
      // wait for event and update balance
      Notify.create('Praying Complete');
    },
  },
});
</script>
