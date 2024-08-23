<template>
  <div>
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
              <div
                v-if="isOpen"
                class="dr w-500 p-2 origin-top-right absolute right-0 mt-2 bg-white rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
              >
                <div
                  class="dr w-600 p-2 absolute right-60 mt-2 bg-white rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                >
                  <label class="relative inline-flex items-center cursor-pointer">
                    <div class="demo-space-x px-2">
                      <VSwitch v-model="columnVisibility.clientCode" />
                    </div>

                    <span class="text-xs font-medium text-gray-900">ClientCode</span>
                  </label>
                  <br />
                  <label class="relative inline-flex items-center cursor-pointer">
                    <div class="demo-space-x px-2">
                      <VSwitch v-model="columnVisibility.emailId" />
                    </div>

                    <span class="text-xs font-medium text-gray-900">EmailId</span>
                  </label>
                  <br />
                  <label class="relative inline-flex items-center cursor-pointer">
                    <div class="demo-space-x px-2">
                      <VSwitch v-model="columnVisibility.emailSubject" />
                    </div>
                    <span class="text-xs font-medium text-gray-900">EmailSubject</span>
                  </label>
                  <br />
                  <label class="relative inline-flex items-center cursor-pointer">
                    <div class="demo-space-x px-2">
                      <VSwitch v-model="columnVisibility.emailMsgId" />
                    </div>
                    <span class="text-xs font-medium text-gray-900">EmailMsgId</span>
                  </label>
                  <br />
                  <label class="relative inline-flex items-center cursor-pointer">
                    <div class="demo-space-x px-2">
                      <VSwitch v-model="columnVisibility.emailStatus" />
                    </div>
                    <span class="text-xs font-medium text-gray-900">EmailStatus</span>
                  </label>
                  <br />
                  <label class="relative inline-flex items-center cursor-pointer">
                    <div class="demo-space-x px-2">
                      <VSwitch v-model="columnVisibility.emailSentDateTime" />
                    </div>
                    <span class="text-xs font-medium text-gray-900">EmailSentDateTime</span>
                  </label>
                  <br />
                  <label class="relative inline-flex items-center cursor-pointer">
                    <div class="demo-space-x px-2">
                      <VSwitch v-model="columnVisibility.emailDeliveredDateTime" />
                    </div>
                    <span class="text-xs font-medium text-gray-900 pl-2">EmailDeliveredDateTime</span>
                  </label>
                  <br />
                  <label class="relative inline-flex items-center cursor-pointer">
                    <div class="demo-space-x px-2">
                      <VSwitch v-model="columnVisibility.emailOpenedDateTime" />
                    </div>
                    <span class="text-xs font-medium text-gray-900">EmailOpenedDateTime</span>
                  </label>
                  <br />
                  <label class="relative inline-flex items-center cursor-pointer">
                    <div class="demo-space-x px-2">
                      <VSwitch v-model="columnVisibility.emailBouncedDateTime" />
                    </div>
                    <span class="text-xs font-medium text-gray-900">EmailBouncedDateTime</span>
                  </label>
                  <br />
                  <label class="relative inline-flex items-center cursor-pointer">
                    <div class="demo-space-x px-2">
                      <VSwitch v-model="columnVisibility.clickedURL" />
                    </div>
                    <span class="text-xs font-medium text-gray-900">clickedURl</span>
                  </label>
                  <br />
                  <label class="relative inline-flex items-center cursor-pointer">
                    <div class="demo-space-x px-2">
                      <VSwitch v-model="columnVisibility.emailClickedDateTime" />
                    </div>
                    <span class="text-xs font-medium text-gray-900">EmailClickedDateTime</span>
                  </label>
                  <br />
                  <label class="relative inline-flex items-center cursor-pointer">
                    <div class="demo-space-x px-2">
                      <VSwitch v-model="columnVisibility.PSkey" />
                    </div>
                    <span class="text-xs font-medium text-gray-900">PSkey</span>
                  </label>
                  <br />
                  <label class="relative inline-flex items-center cursor-pointer">
                    <div class="demo-space-x px-2">
                      <VSwitch v-model="columnVisibility.entryDate" />
                    </div>
                    <span class="text-xs font-medium text-gray-900">EntryDate</span>
                  </label>
                  <br />
                  <label class="relative inline-flex items-center cursor-pointer">
                    <div class="demo-space-x px-2">
                      <VSwitch v-model="columnVisibility.entryTime" />
                    </div>
                    <span class="text-xs font-medium text-gray-900">EntryTime</span>
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
        <VRow>
          <VCol cols="12 my-4">
            <VTable>
              <thead>
                <tr>
                  <th
                    v-if="columnVisibility.clientCode"
                    class="text-uppercase"
                  >
                    Client Code
                  </th>

                  <th
                    v-if="columnVisibility.emailId"
                    class="text-uppercase"
                  >
                    EmailId
                  </th>

                  <th
                    v-if="columnVisibility.emailSubject"
                    class="text-uppercase"
                  >
                    EmailSubject
                  </th>

                  <th
                    v-if="columnVisibility.emailMsgId"
                    class="text-uppercase"
                  >
                    EmailMsgId
                  </th>

                  <th
                    v-if="columnVisibility.emailStatus"
                    class="text-uppercase"
                  >
                    EmailStatus
                  </th>

                  <th
                    v-if="columnVisibility.emailSentDateTime"
                    class="text-uppercase"
                  >
                    EmailSendDateTime
                  </th>

                  <th
                    v-if="columnVisibility.emailDeliveredDateTime"
                    class="text-uppercase"
                  >
                    EmailDeliveredDateTime
                  </th>

                  <th
                    v-if="columnVisibility.emailOpenedDateTime"
                    class="text-uppercase"
                  >
                    EmailOpenedDateTime
                  </th>

                  <th
                    v-if="columnVisibility.emailBouncedDateTime"
                    class="text-uppercase"
                  >
                    EmailBouncedDateTime
                  </th>

                  <th
                    v-if="columnVisibility.clickedURL"
                    class="text-uppercase"
                  >
                    clickedURl
                  </th>
                  <th
                    v-if="columnVisibility.emailClickedDateTime"
                    class="text-uppercase"
                  >
                    EmailClickedDateTime
                  </th>
                  <th
                    v-if="columnVisibility.PSkey"
                    class="text-uppercase"
                  >
                    PSkey
                  </th>
                  <th
                    v-if="columnVisibility.entryDate"
                    class="text-uppercase"
                  >
                    EntryDate
                  </th>
                  <th
                    v-if="columnVisibility.entryTime"
                    class="text-uppercase"
                  >
                    EntryTime
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in filteredDesserts"
                  :key="item.dessert"
                >
                  <td v-if="columnVisibility.clientCode">{{ item.clientCode }}</td>
                  <td v-if="columnVisibility.emailId">{{ item.emailId }}</td>
                  <td v-if="columnVisibility.emailSubject">{{ item.emailSubject }}</td>
                  <td v-if="columnVisibility.emailMsgId">{{ item.emailMsgId }}</td>
                  <td v-if="columnVisibility.emailStatus">{{ item.emailStatus }}</td>
                  <td v-if="columnVisibility.emailSentDateTime">{{ item.emailSentDateTime }}</td>
                  <td v-if="columnVisibility.emailDeliveredDateTime">{{ item.emailDeliveredDateTime }}</td>
                  <td v-if="columnVisibility.emailOpenedDateTime">{{ item.emailOpenedDateTime }}</td>
                  <td v-if="columnVisibility.emailBouncedDateTime">{{ item.emailBouncedDateTime }}</td>
                  <td v-if="columnVisibility.clickedURL">{{ item.clickedURL }}</td>
                  <td v-if="columnVisibility.emailClickedDateTime">{{ item.emailClickedDateTime }}</td>
                  <td v-if="columnVisibility.PSkey">{{ item.PSkey }}</td>
                  <td v-if="columnVisibility.entryDate">{{ item.entryDate }}</td>
                  <td v-if="columnVisibility.entryTime">{{ item.entryTime }}</td>
                </tr>
              </tbody>
            </VTable>
          </VCol>
        </VRow>
      </div>
    </VContainer>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      desserts: [],
      filteredDesserts: [],
      search: '',
      isOpen: false,
      columnVisibility: {
        clientCode: true,
        emailId: true,
        emailSubject: true,
        emailMsgId: true,
        emailStatus: true,
        emailSentDateTime: true,
        emailDeliveredDateTime: true,
        emailOpenedDateTime: true,
        emailBouncedDateTime: true,
        clickedURL: true,
        emailClickedDateTime: true,
        PSkey: true,
        entryDate: true,
        entryTime: true,
      },
      startDate: '',
      ensDate: '',
    }
  },
  mounted() {
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    this.startDate = `${yesterday.getFullYear()}-${('0' + (yesterday.getMonth() + 1)).slice(-2)}-${(
      '0' + yesterday.getDate()
    ).slice(-2)}`
    const today = new Date()
    this.endDate = `${today.getFullYear()}-${('0' + (today.getMonth() + 1)).slice(-2)}-${('0' + today.getDate()).slice(
      -2,
    )}`

    this.fetchData()
    this.filteredDesserts = this.desserts
  },
  computed: {
    filteredDesserts() {
      debugger
      let filtered = this.desserts
      console.log(this.search, 'this.search')
      if (this.search) {
        filtered = filtered.filter(item => {
          return (
            item.clientCode.toLowerCase().includes(this.search.toLowerCase()) ||
            item.emailId.toLowerCase().includes(this.search.toLowerCase()) ||
            item.emailSubject.toLowerCase().includes(this.search.toLowerCase()) ||
            item.emailMsgId.toLowerCase().includes(this.search.toLowerCase()) ||
            item.emailStatus.toLowerCase().includes(this.search.toLowerCase()) ||
            item.emailSentDateTime.toLowerCase().includes(this.search.toLowerCase()) ||
            item.emailDeliveredDateTime.toLowerCase().includes(this.search.toLowerCase()) ||
            item.emailOpenedDateTime.toLowerCase().includes(this.search.toLowerCase()) ||
            item.emailBouncedDateTime.toLowerCase().includes(this.search.toLowerCase()) ||
            item.clickedURL.toLowerCase().includes(this.search.toLowerCase()) ||
            item.emailClickedDateTime.toLowerCase().includes(this.search.toLowerCase()) ||
            item.PSkey.toLowerCase().includes(this.search.toLowerCase()) ||
            item.entryDate.toLowerCase().includes(this.search.toLowerCase()) ||
            item.entryTime.toLowerCase().includes(this.search.toLowerCase())
          )
        })
      }

      return filtered
    },
  },
  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen
    },
    selectdate([start, end]) {
      debugger
      this.startDate = start
      this.endDate = end
      console.log('Selected dates final;:', this.startDate, this.endDate)

      this.fetchData()
    },
    exportDataToCsv() {
      if (!this.desserts.length) {
        return
      }

      const rows = [
        [
          'Client Code',
          'Email Id',
          'emailSubject',
          'emailMsgId',
          'emailStatus',
          'emailSentDateTime',
          'emailDeliveredDateTime',
          'emailOpenedDateTime',
          'emailBouncedDateTime',
          'clickedURL',
          'emailClickedDateTime',
          'PSkey',
          'entryDate',
          'entryTime',
        ],
        ...this.desserts.map(item => [
          item.clientCode,
          item.emailId,
          item.emailSubject,
          item.emailMsgId,
          item.emailStatus,
          item.emailSentDateTime,
          item.emailDeliveredDateTime,
          item.emailOpenedDateTime,
          item.emailBouncedDateTime,
          item.clickedURL,
          item.emailClickedDateTime,
          item.PSkey,
          item.entryDate,
          item.entryTime,
        ]),
      ]

      const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(row => row.join(',')).join('\n')

      const link = document.createElement('a')
      link.setAttribute('href', encodeURI(csvContent))
      link.setAttribute('download', 'email-log.csv')
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },

    watch: {
      startDate: function () {
        this.fetchData()
      },
      endDate: function () {
        this.fetchData()
      },
    },

    fetchData() {
      try {
        if (this.startDate && this.endDate) {
          const formData = new FormData()
          formData.append('from', this.startDate)
          formData.append('to', this.endDate)
          formData.append('logType', 'EMAIL')
          formData.append('authKey', '198a3a05de29c9cc6682116efb2fcef84a5e1cd8b91c6bcbc75ca38177ca96b7')

          axios
            .post('https://g1.gwcindia.in/powerstocks/log-wa-email.php', formData)
            .then(response => {
              this.desserts = response.data.log // Update this.desserts with the response data
              console.log(response.data, 'response.data', this.desserts) // Should print the correct data
            })
            .catch(error => {
              console.error('Error:', error)
            })
        }
      } catch (err) {
        console.error('Error:', err)
      } finally {
      }
    },
  },
}
</script>
