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
      to: '/tableData',
    }"
  />

  <VerticalNavLink
    :item="{
      title: 'Add Client',
      icon: 'ri-archive-drawer-line',
      to: '/clientData',
    }"
  />

  <VerticalNavLink
    :item="{
      title: 'table',
      icon: 'ri-archive-drawer-line',
      to: '/emptyColumn',
    }"
  />
</template>





