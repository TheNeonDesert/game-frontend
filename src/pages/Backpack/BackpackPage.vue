<template>
  <div>
    <h4>BACKPACK</h4>

    <div class="row">
      <div class="col-4">NEON</div>
      <div class="col-4">{{ backpackStore?.formattedNeon }}</div>
    </div>
    <br />
    <div class="row">
      <div class="col-4">STONES</div>
      <div class="col-4">{{ backpackStore?.formattedStone }}</div>
    </div>
    <div class="row">
      <div class="col-4">STICKS</div>
      <div class="col-4">{{ backpackStore?.formattedStick }}</div>
    </div>
    <div class="row">
      <div class="col-4">PLANT FIBERS</div>
      <div class="col-4">{{ backpackStore?.formattedPlant }}</div>
    </div>
    <div class="row">
      <div class="col-4">APPLES</div>
      <div class="col-4">{{ backpackStore?.formattedApple }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { BackpackStore, useBackpackStore } from 'src/stores/backpack.store';

export default defineComponent({
  name: 'BackpackPage',
  setup() {
    return {
      backpackStore: ref<BackpackStore>(),
    };
  },
  created: async function () {
    this.backpackStore = useBackpackStore();
  },
  methods: {},
});
</script>
