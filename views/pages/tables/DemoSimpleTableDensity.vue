


<template>
  <div>
    <v-container class="w-100 h-600">
      <v-row no-gutters>
        <v-col
          cols="3"
          class="d-flex justify-center align-end"
        >
          <DateRangePicker @selecteddate="selectdate" />
        </v-col>
        <v-col
          cols="5"
          class="d-flex justify-center align-end"
        >
          <input
            v-model="search"
            placeholder="Search..."
            class="mt-1 block w-full px-3 mx-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
          />
        </v-col>
        <v-col
          cols="4"
          class="d-flex justify-end justify-space-evenly align-end"
        >
          <div class="hide_menu mt-5">
            <!-- <div>
              <v-btn
                @click="toggleDropdown"
                class="w-150 bg-logcolor mt-2"
              >
                Hide/Show Column
              </v-btn>
            </div> -->
            <div class="demo-space-x pb-3">
              <VSwitch v-model="isOpen" />
            </div>
            <div
              v-if="isOpen"
              class="dr w-500 p-2 origin-top-right absolute right-0 mt-2 bg-white rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
            >
              <div class="drop-menu my-2">
                <label
                  class="text-h6 d-flex ga-2"
                  for="id"
                >
                  <input
                    class="cols whitespace-nowrap"
                    type="checkbox"
                    id="id"
                    v-model="columnVisibility.clientId"
                  />Client Code
                </label>
                <label
                  class="text-h6 d-flex ga-2"
                  for="name"
                >
                  <input
                    class="cols whitespace-nowrap"
                    type="checkbox"
                    id="name"
                    v-model="columnVisibility.stockSymbol"
                  />Stock Symbol
                </label>
                <label
                  class="text-h6 d-flex ga-2"
                  for="date"
                >
                  <input
                    class="cols whitespace-nowrap"
                    type="checkbox"
                    id="date"
                    v-model="columnVisibility.buySellType"
                  />Buy/Sell Type
                </label>
                <label
                  class="text-h6 d-flex ga-2"
                  for="status"
                >
                  <input
                    class="cols whitespace-nowrap"
                    type="checkbox"
                    id="status"
                    v-model="columnVisibility.quantity"
                  />Quantity
                </label>
                <label
                  class="text-h6 d-flex ga-2"
                  for="purchased"
                >
                  <input
                    class="cols"
                    type="checkbox"
                    id="purchased"
                    v-model="columnVisibility.date"
                  />Date
                </label>
                <label
                  class="text-h6 d-flex ga-2"
                  for="purchased"
                >
                  <input
                    class="cols"
                    type="checkbox"
                    id="purchased"
                    v-model="columnVisibility.plan"
                  />Plan
                </label>
                <label
                  class="text-h6 d-flex ga-2"
                  for="action"
                >
                  <input
                    class="cols whitespace-nowrap"
                    type="checkbox"
                    id="action"
                    v-model="columnVisibility.view_user"
                  />View User
                </label>
              </div>
            </div>
          </div>

          <v-btn
            class="bg-logcolor"
            @click="exportDataToCsv"
            >Export CSV</v-btn
          >
        </v-col>
      </v-row>

      <div v-if="pending">Loading...</div>
      <div v-else>
        <!-- Display data table -->
        <v-row>
          <v-col cols="12 my-4">
            <v-data-table
              :headers="tableHeaders"
              :items="filteredDesserts"
              item-key="clientId"
            >
              <template v-slot:item="{ item }">
                <tr class="">
                  <td v-if="columnVisibility.clientId">
                    <p class="mt-4">{{ item.orderData.ClientId }}</p>
                  </td>
                  <td v-if="columnVisibility.stockSymbol">
                    <p class="mt-4">{{ item.orderData.StockSymbol }}</p>
                  </td>
                  <td v-if="columnVisibility.buySellType">
                    <p class="mt-4">{{ item.orderData.BuySell }}</p>
                  </td>
                  <td v-if="columnVisibility.quantity">
                    <p class="mt-4">{{ item.orderData.Quantity }}</p>
                  </td>
                  <td v-if="columnVisibility.date">
                    <p class="mt-4">{{ item.orderData.date }}</p>
                  </td>
                  <td v-if="columnVisibility.plan">
                    <p class="mt-4">{{ item.orderData.plan }}</p>
                  </td>
                  <td v-if="columnVisibility.view_user">
                    <v-btn
                      class="bg-logcolor"
                      @click="canvasheet(item)"
                      >View</v-btn
                    >
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </div>

      <div
        :class="['right-sheet', { 'right-sheet--active': sheet }]"
        class="pa-2"
      >
        <v-card>
          <v-card-text class="d-flex justify-end align-center">
            <v-btn
              class="bg-logcolor"
              @click="canva_close"
              >X</v-btn
            >
          </v-card-text>
          <hr />
          <v-card-title class="d-flex justify-center pa-6">
            <h5 class="font-weight-bold">{{ selectedItem?.orderData.ClientId }}</h5>
          </v-card-title>
          <v-card-text class="d-flex justify-center">
            <v-img :src="selectedItem?.orderData.image"></v-img>
          </v-card-text>
        </v-card>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import axios from 'axios'
const search = ref('')
const headers = [
  { key: 'clientId', title: 'Client Code' },
  { key: 'stockSymbol', title: 'Stock' },
  { key: 'buySellType', title: 'Type' },
  { key: 'quantity', title: 'Quantity' },
  { key: 'date', title: 'Date' },
  { key: 'plan', title: 'Plan' },
  { key: 'orderView', title: 'Order-View' },
]
const startDate = ref(new Date().toISOString().substr(0, 10)) // Set start date to current date
const endDate = ref('')

const productdetails = ref([])
const pending = ref(false)

function formatDateToISO(date) {
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-based
  const dd = String(date.getDate()).padStart(2, '0') // Pad single digit days

  return `${yyyy}-${mm}-${dd}`
}

const selectdate = ([start, end]) => {
  startDate.value = start
  endDate.value = end
  console.log('Selected dates final;:', startDate.value, endDate.value)
  fetchData()
}

const fetchData = async () => {
  pending.value = true

  try {
    const data = {
      from: startDate.value,
      to: endDate.value,
    }

    const response = await axios.post('https://g1.gwcindia.in/powerstocks/ps-view.php', data)

    // Debug after successful response
    console.log(response.data, 'response.data') // Ensure this logs the expected data structure
    productdetails.value = response.data
  } catch (err) {
    console.error('Error:', err)
  } finally {
    pending.value = false
  }
}

fetchData()
watch([startDate, endDate], fetchData, { deep: true })
const dateRange = ref('')
const filteredDesserts = computed(() => {
  console.log('Filtered Desserts Computation Started')
  const query = search.value.toLowerCase()
  const filtered = productdetails.value.filter(item => {
    const searchText = Object.values(item.orderData) // Assuming orderData contains searchable fields
      .join(' ') // Combine all searchable fields into a single string
      .toLowerCase()
    return searchText.includes(query)
  })
  return filtered
})

const sheet = ref(false)
const selectedItem = ref(null)

const canvasheet = item => {
  selectedItem.value = item
  console.log(selectedItem.value, 'selectedItem.value')
  sheet.value = true
}

const canva_close = () => {
  sheet.value = false
  selectedItem.value = null
}

const exportDataToCsv = () => {
  if (!productdetails.value.length) {
    return
  }

  const rows = [
    ['Client Code', 'Stock Symbol', 'Type', 'Quantity', 'Date', 'plan'],
    ...productdetails.value.map(item => [
      item.orderData.clientId,
      item.orderData.stockSymbol,
      item.orderData.buySellType,
      item.orderData.quantity,
      item.orderData.date,
      item.orderData.plan,
    ]),
  ]

  const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(row => row.join(',')).join('\n')

  const link = document.createElement('a')
  link.setAttribute('href', encodeURI(csvContent))
  link.setAttribute('download', 'productdetails_data.csv')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const isOpen = ref(false)
const columnVisibility = ref({
  clientId: true,
  stockSymbol: true,
  buySellType: true,
  quantity: true,
  date: true,
  plan: true,
  view_user: true,
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const toggleColumnVisibility = column => {
  columnVisibility.value[column] = !columnVisibility.value[column]
}

const tableHeaders = headers.map(header => ({
  ...header,
  text: header.title,
  value: header.key,
  sortable: true,
  align: 'start',
  class: 'cursor-pointer',
  width: 'auto',
  'data-id': header.key,
  click: () => toggleColumnVisibility(header.key),
}))
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
  background-color: white;
  block-size: 100%;
  inline-size: 40%;
  inset-block-start: 0;
  inset-inline-end: -100%;
  transition: inset-inline-end 0.3s ease;
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
