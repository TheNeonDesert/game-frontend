<template>
  <div>
    <p>BACKPACK</p>

    <div class="row">
      <div class="col-4">NEON</div>
      <div class="col-4">{{ backpack?.formattedNeon }}</div>
    </div>
    <div class="row">
      <div class="col-4">STONES</div>
      <div class="col-4">{{ backpack?.formattedStone }}</div>
    </div>
    <div class="row">
      <div class="col-4">STICKS</div>
      <div class="col-4">{{ backpack?.formattedStick }}</div>
    </div>
    <div class="row">
      <div class="col-4">PLANT FIBERS</div>
      <div class="col-4">{{ backpack?.formattedPlant }}</div>
    </div>
    <div class="row">
      <div class="col-4">APPLES</div>
      <div class="col-4">{{ backpack?.formattedApple }}</div>
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
