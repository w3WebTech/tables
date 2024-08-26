<template>
  <VContainer class="w-100 h-600">
    <div>
      <VRow no-gutters>
        <VCol
          cols="2"
          class="d-flex justify-center align-end"
        >
          <DateRangePicker @selecteddate="selectdate" />
        </VCol>
        <VCol
          cols="5"
          class="d-flex justify-center align-end"
        >
          <input
            v-model="search"
            placeholder="Search..."
            class="mt-1 block w-full px-3 mx-2 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm"
          />
        </VCol>
        <VCol
          cols="3"
          class="d-flex justify-end justify-space-evenly align-end mx-2"
        >
          <div class="hide_menu mt-5 mr-3">
            <div>
              <v-btn
                @click="toggleDropdown"
                class="w-150 bg-logcolor mt-2"
              >
                Hide/Show Column
              </v-btn>
            </div>
            <!-- <div class="demo-space-x pb-4">
              <VSwitch v-model="isOpen" />
            </div> -->
            <div
              v-if="isOpen"
              class="dr w-500 p-2 origin-top-right absolute right-70 mt-2 bg-white rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
            >
              <div class="drop-menu my-2">
                <label class="relative inline-flex items-center cursor-pointer py-2">
                  <div class="demo-space-x">
                    <VSwitch v-model="columnVisibility.ClientId" />
                  </div>

                  <span class="text-xs font-medium text-gray-900">clientId</span>
                </label>
                <br />

                <label class="relative inline-flex items-center cursor-pointer py-2">
                  <div class="demo-space-x">
                    <VSwitch v-model="columnVisibility.clientName" />
                  </div>
                  <span class="text-xs font-medium text-gray-900">clientName</span>
                </label>
                <br />
                <label class="relative inline-flex items-center cursor-pointer py-2">
                  <VSwitch v-model="columnVisibility.branchCode" />
                  <input
                    class="cols whitespace-nowrap"
                    type="checkbox"
                    id="status"
                  />
                  <span class="text-xs font-medium text-gray-900">branchCode</span>
                </label>
                <br />
                <label class="relative inline-flex items-center cursor-pointer py-2">
                  <div class="demo-space-x">
                    <VSwitch v-model="columnVisibility.receivedDate" />
                  </div>
                  <span class="text-xs font-medium text-gray-900">receivedDate</span>
                </label>
                <br />
                <label class="relative inline-flex items-center cursor-pointer py-2">
                  <div class="demo-space-x">
                    <VSwitch v-model="columnVisibility.receivedTime" />
                  </div>
                  <span class="text-xs font-medium text-gray-900">receivedTime</span>
                </label>
                <br />
                <label class="relative inline-flex items-center cursor-pointer py-2">
                  <div class="demo-space-x">
                    <VSwitch v-model="columnVisibility.plan" />
                  </div>
                  <span class="text-xs font-medium text-gray-900">plan</span>
                </label>
                <br />
                <label class="relative inline-flex items-center cursor-pointer py-2">
                  <div class="demo-space-x">
                    <VSwitch v-model="columnVisibility.view_user" />
                  </div>
                  <span class="text-xs font-medium text-gray-900">ViewUser</span>
                </label>
              </div>
            </div>
          </div>

          <v-btn
            class="bg-logcolor"
            @click="exportDataToCsv"
            >Export CSV</v-btn
          >
        </VCol>
      </VRow>

      <div v-if="pending">Loading...</div>
      <div v-else>
        <!-- Display data table -->
        <VRow>
          <VCol cols="12 my-4">
            <v-data-table
              :headers="visibleTableHeaders"
              :items="filteredDesserts"
              item-key="ClientId"
            >
              <template v-slot:item="{ item }">
                <tr class="">
                  <!-- <td v-if="columnVisibility.clientId">
                    <p class="mt-4">{{ item.stockList.ClientId }}</p>
                  </td> -->
                  <td v-if="columnVisibility.ClientId">
                    <p class="mt-4">{{ item.ClientId }}</p>
                  </td>
                  <td v-if="columnVisibility.clientName">
                    <p class="mt-4">{{ item.clientName }}</p>
                  </td>
                  <td v-if="columnVisibility.branchCode">
                    <p class="mt-4">{{ item.branchCode }}</p>
                  </td>
                  <td v-if="columnVisibility.receivedDate">
                    <p class="mt-4">{{ item.receivedDate }}</p>
                  </td>
                  <td v-if="columnVisibility.receivedTime">
                    <p class="mt-4">{{ item.receivedTime }}</p>
                  </td>
                  <td v-if="columnVisibility.plan">
                    <p class="mt-4">{{ item.plan }}</p>
                  </td>
                  <td v-if="columnVisibility.view_user">
                    <v-btn
                      class="bg-logcolor w-10"
                      @click="isDrawerOpen = true"
                    >
                      <VIcon
                        icon="ri-information-line"
                        color="white"
                        size="22"
                      />
                    </v-btn>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </VCol>
        </VRow>
      </div>

      <VNavigationDrawer
        v-model="isDrawerOpen"
        right
        temporary
        v-if="isDrawerOpen == true"
      >
        <VCard>
          <div class="container mx-auto p-4">
            <div class="bg-white p-6">
              <div class="flex justify-between items-center mb-4">
                <div>
                  <p class="text-gray-600 text-sm">Name: Ramanathan V</p>
                  <p class="text-gray-600 text-sm">M: Ramanathan V</p>
                </div>
                <div>
                  <p class="text-gray-600 text-sm">PAN: AU0XXXXXXB</p>
                  <p class="text-gray-600 text-sm">E: Ramanathan V</p>
                </div>
                <div>
                  <p class="text-gray-600 text-sm">Branch: AU0XXXXXXB</p>
                  <p class="text-gray-600 text-sm">Branch Email: Ramanathan V</p>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <!-- <v-card-title class="d-flex justify-center pa-6">
            <h5 class="font-weight-bold">{{ selectedItem?.stockList.ClientId }}</h5>
          </v-card-title>
          <v-card-text class="d-flex justify-center">
            <v-img :src="selectedItem?.stockList.image"></v-img>
          </v-card-text> -->
          <VTabs v-model="currentTab">
            <VTab>Calls</VTab>
            <VTab>Communication</VTab>
            <VTab>Confirmation</VTab>
            <VTab>Existing Order/Payment Status</VTab>
            <VTab>Payment / Order Status</VTab>
          </VTabs>

          <VWindow
            v-model="currentTab"
            class="mt-5"
          >
            <VWindowItem class="h-screen">
              <div class="p-5">
                <VTable class="border">
                  <thead>
                    <tr>
                      <th class="text-uppercase">Stock Symbol</th>
                      <th class="text-uppercase">Quantity</th>
                      <th class="text-uppercase">Buy / Sell</th>
                      <th class="text-uppercase">Plan</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr
                      v-for="item in desserts"
                      :key="item.dessert"
                    >
                      <td>
                        {{ item.dessert }}
                      </td>
                      <td>
                        {{ item.calories }}
                      </td>
                      <td>
                        {{ item.fat }}
                      </td>
                      <td>
                        {{ item.carbs }}
                      </td>
                    </tr>
                  </tbody>
                </VTable>
              </div>
            </VWindowItem>
            <VWindowItem class="h-screen">
              <div class="container mx-auto p-4">
                <div class="bg-white p-6">
                  <div class="mb-4">
                    <p class="text-gray-600 text-sm">Power Stocks to Email:</p>
                  </div>
                  <div class="mb-4">
                    <p class="text-gray-600 text-sm">1, Sent an email to Customer mail id</p>
                    <p class="text-gray-600 text-sm">erffxxxxxxxxx@gxxx.com 23-08-2024 at 15:22:22</p>
                  </div>
                  <div class="mb-4">
                    <p class="text-gray-600 text-sm">2, Delivered email</p>
                    <p class="text-gray-600 text-sm">erffxxxxxxxxx@gxxx.com 23-08-2024 at 15:22:32</p>
                  </div>
                  <div class="mb-4">
                    <p class="text-gray-600 text-sm">Power Stocks to Whatsapp:</p>
                  </div>
                  <div class="mb-4">
                    <p class="text-gray-600 text-sm">1, Sent an whatsapp to Customer mobile no</p>
                    <p class="text-gray-600 text-sm">9xxxx xxx32 23-08-2024 at 15:22:22</p>
                  </div>
                  <div class="mb-4">
                    <p class="text-gray-600 text-sm">2, Delivered Whatsapp to Customer mobile no</p>
                    <p class="text-gray-600 text-sm">9xxxx xxx32 23-08-2024 at 15:22:23</p>
                  </div>
                  <div class="mb-4">
                    <p class="text-gray-600 text-sm">COMMUNICATION</p>
                  </div>
                </div>
              </div>
            </VWindowItem>
            <VWindowItem class="h-screen">
              <div class="container mx-auto p-4">
                <div class="bg-white p-6">
                  <div class="mb-4">
                    <p class="text-gray-600 text-sm">Confirmed by Customer mail id at 23-08-2024at 15:22:22</p>
                  </div>
                  <div class="mb-4">
                    <p class="text-gray-600 text-sm">Confirmed by Customer Whatsapp at 23-08-2024at 15:22:22</p>
                  </div>
                </div>
              </div>
            </VWindowItem>
            <VWindowItem class="h-screen">
              <div class="container mx-auto p-4">
                <div class="bg-white p-6">
                  <div class="mb-4">
                    <p class="text-gray-600 text-sm">Existing Order Placed at 23-08-2024at 15:22:22</p>
                  </div>
                  <div class="mb-4">
                    <p class="text-gray-600 text-sm">Reason:</p>
                  </div>
                </div>
              </div>
            </VWindowItem>
            <VWindowItem class="h-screen">
              <div class="container mx-auto p-4">
                <div class="bg-white p-6">
                  <div class="mb-4">
                    <p class="text-gray-600 text-sm">Order Placed at 23-08-2024at 15:22:22</p>
                  </div>
                  <div class="mb-4">
                    <p class="text-gray-600 text-sm">Reason:</p>
                  </div>
                </div>
              </div>
            </VWindowItem>
          </VWindow>
        </VCard>
      </VNavigationDrawer>
    </div>
  </VContainer>
</template>
<style lang="scss" scoped>
.v-btn {
  padding-left: 40px !important;
  padding-right: 40px !important;
}
.text-black {
  color: black;
}

.text-gray {
  color: gray;
}

.v-navigation-drawer {
  /* Set the default position */
  right: 0 !important;
  left: auto !important;
  position: fixed !important;
  /* Optional: adjust width as needed */
  width: 60% !important;
  transition: transform 2s ease-in-out;
  transform: translateX(100%);
}
.v-navigation-drawer.v-navigation-drawer--open {
  /* When the drawer is open, move it to the left */
  transform: translateX(0);
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

<script setup>
import { computed, ref } from 'vue'
import axios from 'axios'

const currentTab = ref(0)
console.log(currentTab.value, 'currentT')
const search = ref('')
const headers = [
  { key: 'ClientId', title: 'Client Id' },
  { key: 'clientName', title: 'Client Name' },
  { key: 'branchCode', title: 'Branch Code' },
  { key: 'receivedDate', title: 'Received Date' },
  { key: 'receivedTime', title: 'Received Time' },
  { key: 'plan', title: 'Plan' },
  { key: 'view_user', title: 'View User' },
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
const visibleTableHeaders = computed(() => {
  return tableHeaders.filter(header => columnVisibility.value[header.value])
})
const toggleColumnVisibility = column => {
  columnVisibility.value[column] = !columnVisibility.value[column]
  visibleTableHeaders.value = tableHeaders.filter(header => columnVisibility.value[header.value])
}
const fetchData = async () => {
  pending.value = true

  try {
    const data = {
      from: startDate.value,
      to: endDate.value,
    }

    const response = await axios.post('https://g1.gwcindia.in/powerstocks/powerStocksView-v2.php', data)

    // Debug after successful response
    console.log(response.data, 'response.data') // Ensure this logs the expected data structure
    productdetails.value = response.data
  } catch (err) {
    console.error('Error:', err)
  } finally {
    pending.value = false
  }
}
const detailedView = async () => {
  try {
    const data = {
      clientid: 'GQ1A0007',
      bulkrequestid:
        'b0cf19742beee0e1287ad818787a479a5779786668687663422f34364669576d6d6d317431553769564c592f3553557448774c734645356962636779573244636545554d7970485379656e76312f784173413d3d',
    }

    const response = await axios.post('https://g1.gwcindia.in/powerStocksView-single.php', data)

    // Debug after successful response
    console.log(response.data, 'response.data11') // Ensure this logs the expected data structure
  } catch (err) {
    console.error('Error:', err)
  } finally {
  }
}

fetchData()
detailedView()
watch([startDate, endDate], fetchData, { deep: true })
const dateRange = ref('')
const filteredDesserts = computed(() => {
  if (!productdetails.value || !Array.isArray(productdetails.value)) {
    return []
  }

  const query = search.value.toLowerCase()
  const filtered = productdetails.value.filter(item => {
    const searchText = Object.values(item) // Assuming item contains searchable fields
      .join(' ') // Combine all searchable fields into a single string
      .toLowerCase()
    return searchText.includes(query)
  })
  return filtered
})

const selectedItem = ref(null)

const exportDataToCsv = () => {
  if (!productdetails.value || !productdetails.value.length) {
    return
  }

  const rows = [
    ['Client Code', 'Client Name', 'Branch Code', 'Received date', 'Received time', 'plan', 'view'],
    ...productdetails.value.map(item => [
      item.ClientId,
      item.clientName,
      item.branchCode,
      item.receivedDate,
      item.receivedTime,
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
const desserts = [
  {
    dessert: 'HDFCBANK-EQ',
    calories: 1,
    fat: 'BUY',
    carbs: 'PLAN12',
  },
  {
    dessert: 'HDFCBANK-EQ',
    calories: 1,
    fat: 'BUY',
    carbs: 'PLAN12',
  },
  {
    dessert: 'HDFCBANK-EQ',
    calories: 1,
    fat: 'BUY',
    carbs: 'PLAN12',
  },
  {
    dessert: 'HDFCBANK-EQ',
    calories: 1,
    fat: 'BUY',
    carbs: 'PLAN12',
  },
  {
    dessert: 'HDFCBANK-EQ',
    calories: 1,
    fat: 'BUY',
    carbs: 'PLAN12',
  },
  {
    dessert: 'HDFCBANK-EQ',
    calories: 1,
    fat: 'BUY',
    carbs: 'PLAN12',
  },
  {
    dessert: 'HDFCBANK-EQ',
    calories: 1,
    fat: 'BUY',
    carbs: 'PLAN12',
  },
]
const isDrawerOpen = ref(false)
const isOpen = ref(false)
const columnVisibility = ref({
  ClientId: true,
  clientName: true,
  branchCode: true,
  receivedDate: true,
  receivedTime: true,
  plan: true,
  view_user: true,
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

// const toggleColumnVisibility = column => {
//   columnVisibility.value[column] = !columnVisibility.value[column]
// }

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


