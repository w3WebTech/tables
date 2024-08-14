<template>
  <div>
    <VContainer class="w-100 h-600">
      <div>
        <VRow no-gutters>
          <VCol
            cols="5"
            class="d-flex justify-center align-end"
          ></VCol>
          <VCol
            cols="6"
            class="d-flex justify-center align-end"
          >
            <input
              v-model="search"
              placeholder="Search..."
              class="mt-1 block w-full px-3 mx-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
            />
          </VCol>
          <VCol
            cols="1"
            class="d-flex justify-end justify-space-evenly align-end"
          >
            <v-btn
              class="bg-logcolor"
              @click="exportDataToCsv"
              >+</v-btn
            >
          </VCol>
        </VRow>

        <div>
          <!-- Display data table -->
          <VRow>
            <VCol cols="12 my-4">
              <VTable>
                <thead>
                  <tr>
                    <th class="text-uppercase">Client Code</th>
                    <th class="text-uppercase">Branch Code</th>
                    <th class="text-uppercase">Branch Email</th>
                    <th class="text-uppercase">Action</th>
                  </tr>
                </thead>

                <tbody>
                  <tr
                    v-for="item in filteredDesserts"
                    :key="item.dessert"
                  >
                    <td>{{ item.dessert }}</td>
                    <td>{{ item.calories }}</td>
                    <td>{{ item.fat }}</td>
                    <td>
                      <v-btn
                        @click="deleteItem(item)"
                        class="ml-2 bg-red-500"
                      >
                        DELETE
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </VTable>
            </VCol>
          </VRow>
        </div>
      </div>
    </VContainer>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import axios from 'axios'

// Data
const search = ref('')
const desserts = ref([
  { dessert: 'GD1234', calories: 'ANNANAGAR', fat: 'ADMIN@GWC.IN' },
  { dessert: 'GD1234', calories: 'THANJAVUR', fat: 'ADMIN@GWC.IN' },
  { dessert: 'GD0000', calories: 'THENI', fat: 'ADMIN@GWC.IN' },
  { dessert: 'GD3333', calories: 'CHENNAI', fat: 'ADMIN@GWC.IN' },
  { dessert: 'GD9999', calories: 'TRICHY', fat: 'ADMIN@GWC.IN' },
  { dessert: 'GDY66Y', calories: 'COVAI', fat: 'ADMIN@GWC.IN' },
  // Add other items as needed
])

// Computed property to filter the desserts array based on the search query
const filteredDesserts = computed(() => {
  if (!search.value) {
    return desserts.value
  }
  const query = search.value.toLowerCase()
  return desserts.value.filter(
    item =>
      item.dessert.toLowerCase().includes(query) ||
      item.calories.toLowerCase().includes(query) ||
      item.fat.toLowerCase().includes(query),
  )
})

// Methods
const deleteItem = itemToDelete => {
  desserts.value = desserts.value.filter(item => item !== itemToDelete)
}

const exportDataToCsv = () => {
  // Implementation of CSV export functionality
}
</script>

<style scoped>
.text-black {
  color: black;
}

.text-gray {
  color: gray;
}

.right-sheet {
  position: fixed;
  z-index: 1000;
  background-color: white !important;
  block-size: 100%;
  inline-size: 60%;
  inset-block-start: 0;
  inset-inline-end: -100%;
  transition: inset-inline-end 0.3s ease;
  overflow-y: auto;
}

.sheetopen {
  overflow-y: hidden;
}

.right-sheet--active {
  inset-inline-end: 0;
}

.hide_menu {
  position: relative;
}

.hide_menu .dr {
  position: absolute;
  z-index: 10;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
