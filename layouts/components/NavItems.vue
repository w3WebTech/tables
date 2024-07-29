<script lang="ts" setup>
console.log('trigger')
import VerticalNavGroup from '@layouts/components/VerticalNavGroup.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue'
</script>

<template>
  <VerticalNavLink
    :item="{
      title: 'TABLE',
      icon: 'ri-arrow-right-double-line',
      to: '/tables',
    }"
  />
</template>
