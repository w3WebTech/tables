<template>
  <div>
    <v-container
      class="w-100 h-600"
      :style="{ overflow: this.isEditDrawerOpen == true ? 'hidden' : 'scroll' }"
    >
      <v-row no-gutters>
        <v-col
          cols="2"
          class="d-flex justify-center align-end"
        >
          <DateRangePicker @selecteddate="selectDate" />
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
          class="d-flex justify-end align-end mx-2"
        >
          <div class="hide_menu mt-5 mr-3">
            <v-btn
              @click="toggleDropdown"
              class="w-150 bg-logcolor mt-2"
            >
              Hide/Show Column
            </v-btn>
            <div
              v-if="isOpen"
              class="dr w-500 p-2 absolute right-0 mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
            >
              <div class="drop-menu my-2">
                <label
                  v-for="(visibility, key) in columnVisibility"
                  :key="key"
                  class="relative inline-flex items-center cursor-pointer py-1"
                >
                  <v-switch v-model="columnVisibility[key]" />
                  <span class="text-xs font-medium text-gray-900 px-2">
                    {{ formatColumnLabel(key) }}
                  </span>
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
        <v-row>
          <v-col cols="12 my-4">
            <v-data-table
              :headers="headers"
              :items="paginatedDesserts"
              :items-per-page="pagination.rowsPerPage"
              :page.sync="pagination.page"
              :total-items="filteredDesserts.length"
              :footer-props="{
                itemsPerPageOptions: [10, 25, 50, 100],
                showFirstLastPage: true,
                showCurrentPage: true,
              }"
              @update:items-per-page="updateItemsPerPage"
              @update:page="updatePage"
            >
              <template v-slot:item.clientName="{ item }">
                <td style="white-space: nowrap">{{ item.clientName }}</td>
              </template>
              <template v-slot:item.actions="{ item }">
                <td class="flex justify-start">
                  <div>
                    <v-btn
                      @click="showConfirmationDialog(item)"
                      class="ml-2"
                    >
                      <VIcon
                        icon="ri-shopping-cart-line"
                        color="red"
                        size="22"
                    /></v-btn>
                  </div>
                  <div>
                    <v-btn
                      class="mx-5"
                      @click="enableNav(item)"
                    >
                      <VIcon
                        icon="ri-eye-2-line"
                        color="red"
                        size="22"
                    /></v-btn>
                  </div>
                </td> </template></v-data-table></v-col
        ></v-row>
      </div>
      <VNavigationDrawer
        v-model="isEditDrawerOpen"
        temporary
        right
        v-if="isEditDrawerOpen == true"
        :style="{ overflow: 'scroll' }"
      >
        <VCard class="">
          <VCardTitle class="py-2 px-5"> Order Data </VCardTitle>
          <!-- <div class="px-3">
            {{ this.orderResponse }}
          </div> -->
          <div class="p-5">
            <VTable class="border">
              <thead>
                <tr>
                  <th class="text-uppercase">Stock Symbol</th>
                  <th class="text-uppercase">Quantity</th>
                  <th class="text-uppercase">Buy/Sell</th>

                  <th class="text-uppercase">Order Info</th>
                </tr>
              </thead>

              <tbody>
                <tr
                  v-for="item in this.orderResponse.psOrderData"
                  :key="item.stockName"
                >
                  <td>
                    {{ item.stockName }}
                  </td>
                  <td>
                    {{ item.quantity }}
                  </td>
                  <td>
                    {{ item.buySell }}
                  </td>
                  <td>
                    {{ item.psReqStatus }}
                  </td>
                </tr>
              </tbody>
            </VTable>
          </div>
        </VCard>
      </VNavigationDrawer>
      <VNavigationDrawer
        v-model="isDrawerOpen"
        right
        temporary
        v-if="isDrawerOpen == true"
      >
        <div class="container mx-auto p-4">
          <div class="bg-white p-6">
            <div class="flex justify-between items-center mb-4">
              <div>
                <p class="text-gray-600 text-sm">
                  <span class="font-semibold">NAME:</span> {{ selectedUser.clientName }}
                </p>
                <p class="text-gray-600 text-sm"><span class="font-semibold">M:</span> {{ selectedUser.mobileNo }}</p>
                <p class="text-gray-600 text-sm">
                  <span class="font-semibold">CLIENTCODE: </span>{{ selectedUser.clientCode }}
                </p>
              </div>
              <div class="pb-10">
                <p class="text-gray-600 text-sm"><span class="font-semibold">PAN:</span>{{ selectedUser.panNo }}</p>
                <p class="text-gray-600 text-sm"><span class="font-semibold">E: </span>{{ selectedUser.emailId }}</p>
              </div>
              <div class="pb-10">
                <p class="text-gray-600 text-sm">
                  <span class="font-semibold">BRANCH:</span
                  >{{ selectedUser.branchCode ? selectedUser.branchCode : 'Not Available' }}
                </p>
                <p class="text-gray-600 text-sm">
                  <span class="font-semibold">BRANCH EMAIL:</span>{{ selectedUser.email }}
                </p>
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
          <VTab class="text-sm">Calls</VTab>
          <VTab class="text-sm">Communication</VTab>
          <VTab class="text-sm">Confirmation</VTab>
          <VTab class="text-sm">ExistingOrder/PaymentStatus</VTab>
          <VTab class="text-sm">Payment/OrderStatus</VTab>
        </VTabs>

        <VWindow
          v-model="currentTab"
          class="mt-5 max-h-screen"
        >
          <VWindowItem class="h-full overflow-y-auto">
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
                    v-for="item in info.stockList"
                    :key="item.stockName"
                  >
                    <td>
                      {{ item.stockName }}
                    </td>
                    <td>
                      {{ item.quantity }}
                    </td>
                    <td>
                      {{ item.buySell }}
                    </td>
                    <td>
                      {{ item.plan }}
                    </td>
                  </tr>
                </tbody>
              </VTable>
            </div>
          </VWindowItem>
          <VWindowItem class="h-full overflow-y-auto">
            <div class="container mx-auto p-4">
              <div class="bg-white p-6">
                <div class="mb-4">
                  <p class="text-gray-600 text-sm">Power Stocks to Email:</p>
                </div>
                <div class="mb-4">
                  <p class="text-gray-600 text-sm">1, Sent an email to Customer mail id</p>
                  <p class="text-gray-600 text-sm">
                    {{ info.recommentation_notify.emailNotifyLog.noteDEmail }}
                    {{ info.recommentation_notify.emailNotifyLog.noteDEmailSub }}
                    {{ info.recommentation_notify.emailNotifyLog.noteDEmailSentTime }}
                  </p>
                </div>
                <div class="mb-4">
                  <p class="text-gray-600 text-sm">2, Delivered email</p>
                  <p class="text-gray-600 text-sm">
                    {{ info.recommentation_notify.emailNotifyLog.noteDEmail }}
                    {{ info.recommentation_notify.emailNotifyLog.noteDEmailSub }}
                    {{ info.recommentation_notify.emailNotifyLog.noteDEmailDelTime }}
                  </p>
                </div>
                <div class="mb-4">
                  <p class="text-gray-600 text-sm">Power Stocks to Whatsapp:</p>
                </div>
                <div class="mb-4">
                  <p class="text-gray-600 text-sm">1, Sent an whatsapp to Customer mobile no</p>
                  <p class="text-gray-600 text-sm">
                    {{
                      info.recommentation_notify.waNotifyLog.noteWAmessageSentTime
                        ? info.recommentation_notify.waNotifyLog.noteWAmessageSentTime
                        : 'No Data Available'
                    }}
                  </p>
                </div>
                <div class="mb-4">
                  <p class="text-gray-600 text-sm">2, Delivered Whatsapp to Customer mobile no</p>
                  <p class="text-gray-600 text-sm">
                    {{
                      info.recommentation_notify.waNotifyLog.noteWAmessageDeliveredTime
                        ? info.recommentation_notify.waNotifyLog.noteWAmessageDeliveredTime
                        : 'No Data Available'
                    }}
                  </p>
                </div>
              </div>
            </div>
          </VWindowItem>
          <VWindowItem class="h-full overflow-y-auto">
            <div class="container mx-auto p-4">
              <div class="bg-white p-6">
                <div class="mb-4">
                  <p class="text-gray-600 text-sm">
                    Confirmed by Customer {{ info.confirm_status.confirmationFrom }} at
                    {{ info.confirm_status.confirmStatusDateTime }}
                  </p>
                </div>
              </div>
            </div>
          </VWindowItem>
          <VWindowItem class="h-full overflow-y-auto">
            <div class="container mx-auto p-4">
              <div class="bg-white p-6">
                <div class="mb-4">
                  <p class="text-gray-600 text-sm">
                    Existing Order Placed at {{ info.order_payin_notify.payinNotifyDateTime }}
                  </p>
                </div>
                <div class="">
                  <p>Reason:</p>
                </div>
                <div class="flex">
                  <div
                    class="text-gray-600"
                    v-if="info.stockList[0].placeOrderInfo.placeOrderRemarks"
                  >
                    Remarks:
                  </div>
                  <div
                    class="text-gray-600 text-sm ml-11"
                    v-if="info.stockList[0].placeOrderInfo.placeOrderRemarks"
                  >
                    {{ info.stockList[0].placeOrderInfo.placeOrderRemarks }}
                  </div>
                </div>
                <div class="flex mt-2">
                  <div
                    class="text-gray-600"
                    v-if="info.stockList[0].placeOrderInfo.placeOrderDateTime"
                  >
                    Date & Time:
                  </div>
                  <div
                    class="text-gray-600 text-sm ml-5"
                    v-if="info.stockList[0].placeOrderInfo.placeOrderDateTime"
                  >
                    {{ info.stockList[0].placeOrderInfo.placeOrderDateTime }}
                  </div>
                </div>
                <div class="flex my-2">
                  <div
                    class="text-gray-600"
                    v-if="info.stockList[0].placeOrderInfo.placeOrderNo"
                  >
                    Order No:
                  </div>
                  <div
                    class="text-gray-600 text-sm ml-10"
                    v-if="info.stockList[0].placeOrderInfo.placeOrderNo"
                  >
                    {{ info.stockList[0].placeOrderInfo.placeOrderNo }}
                  </div>
                </div>
              </div>
            </div>
          </VWindowItem>
          <VWindowItem class="h-full overflow-y-auto">
            <div class="container mx-auto p-4">
              <div class="bg-white p-6">
                <div class="mb-4">
                  <p class="text-gray-600 text-sm">
                    Order Placed at{{ info.placeOrder_payin_notify.payinNotifyDateTime }}
                  </p>
                </div>
                <div class="mb-4">
                  <p class="text-gray-600 text-sm">Reason:</p>
                </div>
              </div>
            </div>
          </VWindowItem>
        </VWindow>
      </VNavigationDrawer>
    </v-container>
  </div>
</template>
             
          

<script>
import axios from 'axios'
import Swal from 'sweetalert2'
import { userDataStore } from '~/stores/tableData'
import { useRouter } from 'vue-router'
const router = useRouter()
const userStore = userDataStore()
export default {
  data() {
    return {
      search: '',
      currentTab: 0,
      isOpen: false,
      isEditDrawerOpen: false,
      isDrawerOpen: false,
      pending: false,
      columnVisibility: {
        ClientId: true,
        rowId: true,
        clientName: true,
        mobileNo: true,
        receivedDate: true,
        receivedTime: true,
        plan: true,
        Actions: true,
      },
      orderResponse: [],
      desserts1: [], // Ensure this is an array
      pagination: {
        page: 1,
        rowsPerPage: 10,
        sortBy: 'sendDateTime',
        descending: true,
      },
      startDate: '',
      endDate: '',
      info: {},
      selectedUser: {
        useName: '',
        email: '',
        panNo: '',
        branchCode: '',
        mobileNo: '',
        emailId: '',
        clientCode: '',
      },
    }
  },

  computed: {
    filteredDesserts() {
      return this.desserts1
        ? this.desserts1.filter(item => {
            return Object.keys(item).some(key => {
              return item[key] && item[key].toString().toLowerCase().includes(this.search.toLowerCase())
            })
          })
        : []
    },
    paginatedDesserts() {
      if (!this.filteredDesserts) return []
      const start = (this.pagination.page - 1) * this.pagination.rowsPerPage
      return this.filteredDesserts.slice(start, start + this.pagination.rowsPerPage)
    },
    headers() {
      if (!this.desserts1 || this.desserts1.length === 0) return []
      const columns = Object.keys(this.desserts1[0])
        .filter(key => this.columnVisibility[key] || this.columnVisibility[key.toLowerCase()])
        .map(key => ({
          text: this.formatColumnLabel(key),
          value: key,
          title: key,
        }))
      columns.push({ text: 'Actions', value: 'actions', sortable: false, title: 'Actions' })
      return columns
    },
  },
  mounted() {
    const userId = userStore.userId || ''
    const password = userStore.password || ''
    if (userId == null || userId == '' || userId == undefined) {
      router.push('/login')
    }
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    this.startDate = this.formatDate(yesterday)
    const today = new Date()
    this.endDate = this.formatDate(today)
    this.fetchData()
  },
  methods: {
    selectDate([start, end]) {
      this.startDate = start
      this.endDate = end
      this.fetchData()
    },
    toggleDropdown() {
      this.isOpen = !this.isOpen
    },
    exportDataToCsv() {
      const data = this.filteredDesserts
      const csv = [Object.keys(data[0]).join(','), ...data.map(row => Object.values(row).join(','))]
      const blob = new Blob([csv.join('\n')], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = 'ORDER-DATA.csv'
      link.click()
      URL.revokeObjectURL(link.href)
    },
    fetchData() {
      this.pending = true
      if (this.startDate && this.endDate) {
        const data = {
          from: this.startDate,
          to: this.endDate,
        }
        const params = new URLSearchParams()
        Object.keys(data).forEach(key => {
          params.append(key, data[key])
        })

        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }

        axios
          .post('https://g1.gwcindia.in/powerstocks/powerStocksView-v2.php?confirmed', params, config)
          .then(response => {
            this.desserts1 = response.data // Update this.desserts with the response data
            console.log(response.data, 'response.data', this.desserts1) // Should print the correct data
            this.pending = false
          })
          .catch(error => {
            console.error('Error:', error)
            this.pending = false
          })
      }
    },
    orderData(value) {
      console.log(value, 'value')
      const data = {
        clientCode: value.ClientId,
        requestId: value.bulkReqId,
        requestedUser: value.logCode,
        userCode: value.logCode,
      }
      const params = new URLSearchParams()
      Object.keys(data).forEach(key => {
        params.append(key, data[key])
      })

      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }

      axios
        .post('https://g1.gwcindia.in/powerstocks/ps-place-order.php', params, config)
        .then(response => {
          console.log(response.data, 'response.data', this.desserts1) // Should print the correct data
          this.orderResponse = response.data
          // Swal.fire({
          //   icon: 'success',
          //   title: 'Order Placed',
          //   text: 'Order Placed successfully!',
          // })
        })
        .catch(error => {
          console.error('Error:', error)
        })
    },
    async showConfirmationDialog(data) {
      // debugger
      // let result = await Swal.fire({
      //   title: 'Are you sure to place order?',
      //   text: "You won't be able to revert this order!",
      //   icon: 'warning',

      //   confirmButtonColor: '#03ad0f',
      //   cancelButtonColor: '#f21621',
      //   confirmButtonText: 'Place Order!',
      //   confirmButtonTextStyle: 'color: white',
      //   cancelButtonColor: '#007bff',
      // })

      // if (result.isConfirmed) {
      this.orderData(data)
      this.isEditDrawerOpen = true
      // }
    },
    async enableNav(data) {
      console.log(data, 'adata')
      this.selectedUser.email = data.branchEmail
      this.selectedUser.clientName = data.clientName
      this.selectedUser.panNo = data.panNo
      this.selectedUser.branchCode = data.branchCode
      this.selectedUser.mobileNo = data.mobileNo
      this.selectedUser.emailId = data.emailId
      this.selectedUser.clientCode = data.ClientId
      this.detailedView(data.ClientId, data.bulkReqId)
      this.isDrawerOpen = true
    },
    async detailedView(clientCode, bulkRedId) {
      try {
        const data = {
          clientCode: clientCode,
          requestId: bulkRedId,
        }

        const params = new URLSearchParams()
        Object.keys(data).forEach(key => {
          params.append(key, data[key])
        })

        const config = {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }

        const response = await axios.post(
          'https://g1.gwcindia.in/powerstocks/powerStocksView-single.php',
          params,
          config,
        )
        this.info = response.data
        // Debug after successful response
        console.log(response.data, 'response.data11')
      } catch (err) {
        console.error('Error:', err)
      } finally {
      }
    },
    formatDate(date) {
      return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`
    },
    formatColumnLabel(key) {
      return key
        .replace(/_/g, ' ')
        .replace(/([A-Z])/g, ' $1')
        .trim()
    },
    updateItemsPerPage(value) {
      this.pagination.rowsPerPage = value
      this.pagination.page = 1 // Reset to first page when changing items per page
    },
    updatePage(value) {
      this.pagination.page = value
    },
  },
}
</script>
<style lang="scss" scoped>
.v-navigation-drawer {
  /* Set the default position */
  right: 0 !important;
  left: auto !important;
  position: fixed !important;
  /* Optional: adjust width as needed */
  width: 70% !important;
  transition: transform 2s ease-in-out;
  transform: translateX(100%);
}
.v-navigation-drawer.v-navigation-drawer--open {
  /* When the drawer is open, move it to the left */
  transform: translateX(0);
}
</style>


