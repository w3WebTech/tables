<template>
  <div class="container mx-auto pt-1">
    <input
      id="datepicker"
      type="text"
      placeholder="Select Date Range"
      class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useNuxtApp } from '#app'

export default defineComponent({
  name: 'DateRangePicker',
  setup(_, { emit }) {
    const { $flatpickr } = useNuxtApp()

    onMounted(() => {
      // Initialize Flatpickr
      $flatpickr('#datepicker', {
        mode: 'range',
        dateFormat: 'Y-m-d',
        locale: {
          firstDayOfWeek: 1, // Start week on Monday
        },
        onChange: (selectedDates: Date[], dateStr: string) => {
          console.log('Selected dates:', selectedDates)
          console.log('Formatted date string:', dateStr)
          const formattedDates = selectedDates.map(date => formatDateToISO(date))
          console.log(formattedDates, 'formattedDates')
          emit('selecteddate', formattedDates)
        },
      })
    })
  },
})
function formatDateToISO(date: Date): string {
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}
</script>

