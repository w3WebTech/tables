<!-- pages/index.vue -->
<template>
  <div>
    <h1>Todos</h1>
    <ul>
      <li
        v-for="todo in todosStore.todos"
        :key="todo.id"
      >
        {{ todo }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useTodosStore } from '~/stores/tableData'

const todosStore = useTodosStore()

onMounted(async () => {
  await todosStore.fetchTodos()
})
</script>
