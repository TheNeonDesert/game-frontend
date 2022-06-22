<template>
  <div>
    <p>BACKPACK</p>

    <div class="row">
      <div class="col-4">NEON</div>
      <div class="col-4">{{ backpack?.formattedNeon }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { IBackpack, useBackpackStore } from 'src/stores/backpack.store';

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
  methods: {},
});
</script>
