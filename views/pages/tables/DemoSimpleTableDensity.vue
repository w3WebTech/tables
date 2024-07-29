


<template>
  <div>
    <v-container class="w-100">
      <v-row no-gutters>
        <v-col
          cols="5"
          class="d-flex ga-2"
        >
          <div>
            <label for="start-date">Start Date:</label>
            <input
              v-model="startDate"
              type="date"
              style="border: 1px solid black"
              class="w-100 pa-2"
            />
          </div>
          <div>
            <label for="end-date">End Date:</label>
            <input
              v-model="endDate"
              type="date"
              style="border: 1px solid black"
              class="w-100 pa-2"
            />
          </div>
        </v-col>
        <v-col
          cols="3"
          class="d-flex justify-center align-end"
        >
          <v-text-field
            v-model="search"
            placeholder="Search..."
          ></v-text-field>
        </v-col>
        <v-col
          cols="4"
          class="d-flex justify-end justify-space-evenly align-end"
        >
          <div class="hide_menu mt-5">
            <div>
              <v-btn
                @click="toggleDropdown"
                class="w-100 bg-logcolor pa-2"
              >
                Hide/Show Column
              </v-btn>
            </div>
            <div
              v-if="isOpen"
              class="dr w-100 origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
            >
              <div class="drop-menu">
                <label
                  class="text-h6 d-flex ga-2"
                  for="id"
                >
                  <input
                    class="cols"
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
                    class="cols"
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
                    class="cols"
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
                    class="cols"
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
                    class="cols"
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

      <div v-if="pendingg">Loading...</div>
      <div v-else-if="error">try again</div>
      <div v-else>
        <!-- Display data table -->
        <v-row>
          <v-col cols="12">
            <v-data-table
              :headers="tableHeaders"
              :items="filteredDesserts"
              item-key="clientId"
            >
              <template v-slot:item="props">
                <tr>
                  <td v-if="columnVisibility.clientId">
                    <p class="text-black">{{ props.item.clientId }}</p>
                  </td>
                  <td v-if="columnVisibility.stockSymbol">
                    <p class="text-black">{{ props.item.stockSymbol }}</p>
                  </td>
                  <td v-if="columnVisibility.buySellType">
                    <p class="text-black">{{ props.item.buySellType }}</p>
                  </td>
                  <td v-if="columnVisibility.quantity">
                    <p class="text-black">{{ props.item.quantity }}</p>
                  </td>
                  <td v-if="columnVisibility.date">
                    <p class="text-black">{{ props.item.date }}</p>
                  </td>
                  <td v-if="columnVisibility.plan">
                    <p class="text-black">{{ props.item.plan }}</p>
                  </td>
                  <td v-if="columnVisibility.view_user">
                    <v-btn
                      class="bg-logcolor"
                      @click="canvasheet(props.item)"
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
            <h5 class="font-weight-bold">{{ selectedItem?.clientId }}</h5>
          </v-card-title>
          <v-card-text class="d-flex justify-center">
            <v-img :src="selectedItem?.image"></v-img>
          </v-card-text>
        </v-card>
      </div>
    </v-container>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

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

const { pendingg, error, data: productdetails } = await useFetch('https://g1.gwcindia.in/powerstocks/powerstocks.json')

const filteredDesserts = computed(() => {
  const query = search.value.toLowerCase()
  const start = startDate.value ? new Date(startDate.value) : null
  const end = endDate.value ? new Date(endDate.value) : null

  if (!productdetails.value.length) {
    return []
  }

  return productdetails.value.filter(item => {
    const itemDate = new Date(item.date)
    const matchesSearch =
      !search.value ||
      item.clientId.toLowerCase().includes(query) ||
      item.stockSymbol.toLowerCase().includes(query) ||
      item.buySellType.toLowerCase().includes(query) ||
      item.quantity.toString().includes(query) ||
      item.date.toLowerCase().includes(query) ||
      item.plan.toLowerCase().includes(query)
    const matchesDateRange = (!startDate.value || itemDate >= start) && (!endDate.value || itemDate <= end)

    return matchesSearch && matchesDateRange
  })
})

const sheet = ref(false)
const selectedItem = ref(null)

const canvasheet = item => {
  selectedItem.value = item
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
      item.clientId,
      item.stockSymbol,
      item.buySellType,
      item.quantity,
      item.date,
      item.plan,
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
