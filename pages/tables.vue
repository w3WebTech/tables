
<script lang="ts" setup>
import { ref } from 'vue'
import DemoSimpleTableDensity from '@/views/pages/tables/DemoSimpleTableDensity.vue'
const currentTab = ref(0)
console.log(currentTab.value, 'currentT')
</script>

<template>
  <VCard>
    <VTabs
      v-model:active="currentTab"
      class="v-tabs-pill"
    >
      <VTab>Tab One</VTab>
      <VTab>Tab Two</VTab>
      <VTab>Tab Three</VTab>
      <VTab>Tab Four</VTab>
      <VTab>Tab Five</VTab>
    </VTabs>

    <VWindow
      v-model:active="currentTab"
      class="mt-5"
    >
      <VWindowItem
        v-for="item in 5"
        :key="item"
      >
        <DemoSimpleTableDensity />
      </VWindowItem>
    </VWindow>
     
  </VCard>
</template>
<style lang="scss" scoped>
.v-btn {
  padding-left: 40px !important;
  padding-right: 40px !important;
}
</style>


