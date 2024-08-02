<script lang="ts" setup>
import VerticalNavGroup from '@layouts/components/VerticalNavGroup.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'
</script>

<template>
  <!-- 👉 Dashboards -->

  <VerticalNavLink
    :item="{
      title: 'Dashboard',
      to: '/dashboard',
    }"
  />

  <VerticalNavLink
    :item="{
      title: 'Progress',
      icon: 'ri-table-alt-line',
      to: '/tables',
    }"
  />
</template>


