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
                class="dr w-500 p-2 absolute right-60 mt-2 bg-white rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
              >
                <div class="drop-menu my-2">
                  <label class="relative inline-flex items-center cursor-pointer">
                    <div class="demo-space-x">
                      <VSwitch v-model="columnVisibility.userCode" />
                    </div>
                    <span class="text-xs font-medium text-gray-900">UserCode</span> </label
                  ><br />
                  <label class="relative inline-flex items-center cursor-pointer">
                    <div class="demo-space-x">
                      <VSwitch v-model="columnVisibility.userMobile" />
                    </div>
                    <span class="text-xs font-medium text-gray-900">UserMobile</span>
                  </label>
                  <br />
                  <label class="relative inline-flex items-center cursor-pointer">
                    <div class="demo-space-x">
                      <VSwitch v-model="columnVisibility.from" />
                    </div>
                    <span class="text-xs font-medium text-gray-900">From</span>
                  </label>
                  <br />
                  <label class="relative inline-flex items-center cursor-pointer">
                    <div class="demo-space-x">
                      <VSwitch v-model="columnVisibility.templateName" />
                    </div>
                    <span class="text-xs font-medium text-gray-900">TemplateName</span>
                  </label>
                  <br />
                  <label class="relative inline-flex items-center cursor-pointer">
                    <div class="demo-space-x">
                      <VSwitch v-model="columnVisibility.sendDateTime" />
                    </div>
                    <span class="text-xs font-medium text-gray-900">SendDateTime</span>
                  </label>
                  <br />
                  <label class="relative inline-flex items-center cursor-pointer">
                    <div class="demo-space-x">
                      <VSwitch v-model="columnVisibility.sendReqData" />
                    </div>
                    <span class="text-xs font-medium text-gray-900">SendReqData</span>
                  </label>
                  <br />
                  <label class="relative inline-flex items-center cursor-pointer">
                    <div class="demo-space-x">
                      <VSwitch v-model="columnVisibility.sendResponseData" />
                    </div>
                    <span class="text-xs font-medium text-gray-900">SendResponseData</span>
                  </label>
                  <br />
                  <label class="relative inline-flex items-center cursor-pointer">
                    <div class="demo-space-x">
                      <VSwitch v-model="columnVisibility.msgStatus" />
                    </div>
                    <span class="text-xs font-medium text-gray-900">MsgStatus</span>
                  </label>
                  <br />
                  <label class="relative inline-flex items-center cursor-pointer">
                    <div class="demo-space-x">
                      <VSwitch v-model="columnVisibility.StatusUpdatedTime" />
                    </div>
                    <span class="text-xs font-medium text-gray-900">StatusUpdatedTime</span> </label
                  ><br />
                  <label class="relative inline-flex items-center cursor-pointer">
                    <div class="demo-space-x">
                      <VSwitch v-model="columnVisibility.messageId" />
                    </div>
                    <span class="text-xs font-medium text-gray-900">MessageId</span> </label
                  ><br />
                  <label class="relative inline-flex items-center cursor-pointer">
                    <div class="demo-space-x">
                      <VSwitch v-model="columnVisibility.messageSentTime" />
                    </div>
                    <span class="text-xs font-medium text-gray-900">MessageSentTime</span> </label
                  ><br />
                  <label class="relative inline-flex items-center cursor-pointer">
                    <div class="demo-space-x">
                      <VSwitch v-model="columnVisibility.SendWebHookData" />
                    </div>
                    <span class="text-xs font-medium text-gray-900">SendWebHookData</span> </label
                  ><br />
                  <label class="relative inline-flex items-center cursor-pointer">
                    <div class="demo-space-x">
                      <VSwitch v-model="columnVisibility.messageDeliveredTime" />
                    </div>
                    <span class="text-xs font-medium text-gray-900">MessageDeliveredTime</span> </label
                  ><br />
                  <label class="relative inline-flex items-center cursor-pointer">
                    <div class="demo-space-x">
                      <VSwitch v-model="columnVisibility.DeliveredWebhookData" />
                    </div>
                    <span class="text-xs font-medium text-gray-900">DeliveredWebhookData</span> </label
                  ><br />
                  <label class="relative inline-flex items-center cursor-pointer">
                    <div class="demo-space-x">
                      <VSwitch v-model="columnVisibility.messageReadTime" />
                    </div>
                    <span class="text-xs font-medium text-gray-900">MessageReadTime</span> </label
                  ><br />
                  <label class="relative inline-flex items-center cursor-pointer">
                    <div class="demo-space-x">
                      <VSwitch v-model="columnVisibility.readWebhookData" />
                    </div>
                    <span class="text-xs font-medium text-gray-900">ReadWebhookData</span> </label
                  ><br />
                  <label class="relative inline-flex items-center cursor-pointer">
                    <div class="demo-space-x">
                      <VSwitch v-model="columnVisibility.pskey" />
                    </div>
                    <span class="text-xs font-medium text-gray-900">PSkey</span> </label
                  ><br />
                  <label class="relative inline-flex items-center cursor-pointer">
                    <div class="demo-space-x">
                      <VSwitch v-model="columnVisibility.entryDate" />
                    </div>
                    <span class="text-xs font-medium text-gray-900">EntryDate</span> </label
                  ><br />
                  <label class="relative inline-flex items-center cursor-pointer">
                    <div class="demo-space-x">
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
                    v-if="columnVisibility.userCode"
                    class="text-uppercase"
                  >
                    UserCode
                  </th>
                  <th
                    v-if="columnVisibility.userMobile"
                    class="text-uppercase"
                  >
                    UserMobile
                  </th>
                  <th
                    v-if="columnVisibility.from"
                    class="text-uppercase"
                  >
                    From
                  </th>
                  <th
                    v-if="columnVisibility.templateName"
                    class="text-uppercase"
                  >
                    TemplateName
                  </th>
                  <th
                    v-if="columnVisibility.sendDateTime"
                    class="text-uppercase"
                  >
                    sendDateTime
                  </th>
                  <th
                    v-if="columnVisibility.sendReqData"
                    class="text-uppercase"
                  >
                    sendReqData
                  </th>
                  <th
                    v-if="columnVisibility.sendResponseData"
                    class="text-uppercase"
                  >
                    SendResponceData
                  </th>
                  <th
                    v-if="columnVisibility.msgStatus"
                    class="text-uppercase"
                  >
                    MsgStatus
                  </th>
                  <th
                    v-if="columnVisibility.StatusUpdatedTime"
                    class="text-uppercase"
                  >
                    StatusUpdatedTime
                  </th>
                  <th
                    v-if="columnVisibility.messageId"
                    class="text-uppercase"
                  >
                    MessageId
                  </th>
                  <th
                    v-if="columnVisibility.messageSentTime"
                    class="text-uppercase"
                  >
                    MessageSendTime
                  </th>
                  <th
                    v-if="columnVisibility.SendWebHookData"
                    class="text-uppercase"
                  >
                    SendWebHookData
                  </th>
                  <th
                    v-if="columnVisibility.messageDeliveredTime"
                    class="text-uppercase"
                  >
                    MessageDeliveredTime
                  </th>
                  <th
                    v-if="columnVisibility.DeliveredWebhookData"
                    class="text-uppercase"
                  >
                    DeliveredWebHookData
                  </th>
                  <th
                    v-if="columnVisibility.messageReadTime"
                    class="text-uppercase"
                  >
                    MessageReadTime
                  </th>
                  <th
                    v-if="columnVisibility.readWebhookData"
                    class="text-uppercase"
                  >
                    ReadWebHookData
                  </th>
                  <th
                    v-if="columnVisibility.pskey"
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
                  v-for="item in filteredDesserts1"
                  :key="item.dessert1"
                >
                  <td v-if="columnVisibility.userCode">{{ item.userCode }}</td>
                  <td v-if="columnVisibility.userMobile">{{ item.userMobile }}</td>
                  <td v-if="columnVisibility.from">{{ item.from }}</td>
                  <td v-if="columnVisibility.templateName">{{ item.templateName }}</td>
                  <td v-if="columnVisibility.sendDateTime">{{ item.sendDateTime }}</td>
                  <td v-if="columnVisibility.sendReqData">{{ item.sendReqData }}</td>
                  <td v-if="columnVisibility.sendResponseData">{{ item.sendResponseData }}</td>
                  <td v-if="columnVisibility.msgStatus">{{ item.msgStatus }}</td>
                  <td v-if="columnVisibility.StatusUpdatedTime">{{ item.StatusUpdatedTime }}</td>
                  <td v-if="columnVisibility.messageId">{{ item.messageId }}</td>
                  <td v-if="columnVisibility.messageSentTime">{{ item.messageSentTime }}</td>
                  <td v-if="columnVisibility.SendWebHookData">{{ item.SendWebHookData }}</td>
                  <td v-if="columnVisibility.messageDeliveredTime">{{ item.messageDeliveredTime }}</td>
                  <td v-if="columnVisibility.DeliveredWebhookData">{{ item.DeliveredWebhookData }}</td>
                  <td v-if="columnVisibility.messageReadTime">{{ item.MessageReadTime }}</td>
                  <td v-if="columnVisibility.readWebhookData">{{ item.readWebhookData }}</td>
                  <td v-if="columnVisibility.pskey">{{ item.pskey }}</td>
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
export default {
  data() {
    return {
      desserts1: [
        {
          userCode: 'user123',
          userMobile: '9876543210',
          from: 'PowerStocks',
          templateName: 'Welcome Email',
          sendDateTime: '2023-03-15 10:00:00',
          sendReqData: '{"name":"Archana","email":"Archana@gmail.com"}',
          sendResponseData: '{"status":"success","message_id":"1234567890"}',
          msgStatus: 'Sent',
          StatusUpdatedTime: '2023-03-15 10:00:05',
          messageId: '1234567890',
          messageSentTime: '2023-03-15 10:00:05',
          SendWebHookData: '{}',
          messageDeliveredTime: '2023-03-15 10:00:10',
          DeliveredWebhookData: '{}',
          messageReadTime: '2023-03-15 10:00:15',
          readWebhookData: '{}',
          pskey: 'xyz123',
          entryDate: '2023-03-15',
          entryTime: '10:00:00',
        },
        {
          userCode: 'user123',
          userMobile: '9876543210',
          from: 'PowerStocks',
          templateName: 'Welcome Email',
          sendDateTime: '2023-03-15 10:00:00',
          sendReqData: '{"name":"Archana","email":"Archana@gmail.com"}',
          sendResponseData: '{"status":"success","message_id":"1234567890"}',
          msgStatus: 'Sent',
          StatusUpdatedTime: '2023-03-15 10:00:05',
          messageId: '1234567890',
          messageSentTime: '2023-03-15 10:00:05',
          SendWebHookData: '{}',
          messageDeliveredTime: '2023-03-15 10:00:10',
          DeliveredWebhookData: '{}',
          messageReadTime: '2023-03-15 10:00:15',
          readWebhookData: '{}',
          pskey: 'xyz123',
          entryDate: '2023-03-15',
          entryTime: '10:00:00',
        },
        {
          userCode: 'user123',
          userMobile: '9876543210',
          from: 'PowerStocks',
          templateName: 'Welcome Email',
          sendDateTime: '2023-03-15 10:00:00',
          sendReqData: '{"name":"Archana","email":"Archana@gmail.com"}',
          sendResponseData: '{"status":"success","message_id":"1234567890"}',
          msgStatus: 'Sent',
          StatusUpdatedTime: '2023-03-15 10:00:05',
          messageId: '1234567890',
          messageSentTime: '2023-03-15 10:00:05',
          SendWebHookData: '{}',
          messageDeliveredTime: '2023-03-15 10:00:10',
          DeliveredWebhookData: '{}',
          messageReadTime: '2023-03-15 10:00:15',
          readWebhookData: '{}',
          pskey: 'xyz123',
          entryDate: '2023-03-15',
          entryTime: '10:00:00',
        },
        {
          userCode: 'user789',
          userMobile: '9876543210',
          from: 'PowerStocks',
          templateName: 'Welcome Email',
          sendDateTime: '2023-03-15 10:00:00',
          sendReqData: '{"name":"Arthi","email":"Arthi@gmail.com"}',
          sendResponseData: '{"status":"success","message_id":"1234567890"}',
          msgStatus: 'Sent',
          StatusUpdatedTime: '2023-03-15 10:00:05',
          messageId: '1234567890',
          messageSentTime: '2023-03-15 10:00:05',
          SendWebHookData: '{}',
          messageDeliveredTime: '2023-03-15 10:00:10',
          DeliveredWebhookData: '{}',
          messageReadTime: '2023-03-15 10:00:15',
          readWebhookData: '{}',
          pskey: 'xyz123',
          entryDate: '2023-03-15',
          entryTime: '10:00:00',
        },
        {
          userCode: 'user1000',
          userMobile: '9876543210',
          from: 'PowerStocks',
          templateName: 'Welcome Email',
          sendDateTime: '2023-03-15 10:00:00',
          sendReqData: '{"name":"aa","email":"aa@gmail.com"}',
          sendResponseData: '{"status":"success","message_id":"1234567890"}',
          msgStatus: 'Sent',
          StatusUpdatedTime: '2023-03-15 10:00:05',
          messageId: '1234567890',
          messageSentTime: '2023-03-15 10:00:05',
          SendWebHookData: '{}',
          messageDeliveredTime: '2023-03-15 10:00:10',
          DeliveredWebhookData: '{}',
          messageReadTime: '2023-03-15 10:00:15',
          readWebhookData: '{}',
          pskey: 'xyz123',
          entryDate: '2023-03-15',
          entryTime: '10:00:00',
        },
        {
          userCode: '777777',
          userMobile: '9876543210',
          from: 'PowerStocks',
          templateName: 'Welcome Email',
          sendDateTime: '2023-03-15 10:00:00',
          sendReqData: '{"name":"Archana123","email":"Archana123@gmail.com"}',
          sendResponseData: '{"status":"success","message_id":"1234567890"}',
          msgStatus: 'Sent',
          StatusUpdatedTime: '2023-03-15 10:00:05',
          messageId: '1234567890',
          messageSentTime: '2023-03-15 10:00:05',
          SendWebHookData: '{}',
          messageDeliveredTime: '2023-03-15 10:00:10',
          DeliveredWebhookData: '{}',
          messageReadTime: '2023-03-15 10:00:15',
          readWebhookData: '{}',
          pskey: 'xyz123',
          entryDate: '2023-03-15',
          entryTime: '10:00:00',
        },
      ],
      filteredDesserts1: [],
      search: '',
      isOpen: false,
      columnVisibility: {
        userCode: true,
        userMobile: true,
        from: true,
        templateName: true,
        sendDateTime: true,
        sendReqData: true,
        sendResponseData: true,
        msgStatus: true,
        StatusUpdatedTime: true,
        messageId: true,
        messageSentTime: true,
        SendWebHookData: true,
        messageDeliveredTime: true,
        DeliveredWebhookData: true,
        messageReadTime: true,
        readWebhookData: true,
        pskey: true,
        entryDate: true,
        entryTime: true,
      },
    }
  },
  mounted() {
    this.filteredDesserts1 = this.desserts1 // initialize filteredDesserts with the full array
  },
  computed: {
    filteredDesserts1() {
      let filteredData = this.desserts1
      if (this.search) {
        filteredData = filteredData.filter(item => {
          return (
            item.userCode.toLowerCase().includes(this.search.toLowerCase()) ||
            item.userMobile.toLowerCase().includes(this.search.toLowerCase()) ||
            item.from.toLowerCase().includes(this.search.toLowerCase()) ||
            item.templateName.toLowerCase().includes(this.search.toLowerCase()) ||
            item.sendDateTime.toLowerCase().includes(this.search.toLowerCase()) ||
            item.sendReqData.toLowerCase().includes(this.search.toLowerCase()) ||
            item.sendResponseData.toLowerCase().includes(this.search.toLowerCase()) ||
            item.msgStatus.toLowerCase().includes(this.search.toLowerCase()) ||
            item.StatusUpdatedTime.toLowerCase().includes(this.search.toLowerCase()) ||
            item.messageId.toLowerCase().includes(this.search.toLowerCase()) ||
            item.messageSentTime.toLowerCase().includes(this.search.toLowerCase()) ||
            item.SendWebHookData.toLowerCase().includes(this.search.toLowerCase()) ||
            item.messageDeliveredTime.toLowerCase().includes(this.search.toLowerCase()) ||
            item.DeliveredWebhookData.toLowerCase().includes(this.search.toLowerCase()) ||
            item.messageReadTime.toLowerCase().includes(this.search.toLowerCase()) ||
            item.readWebhookData.toLowerCase().includes(this.search.toLowerCase()) ||
            item.pskey.toLowerCase().includes(this.search.toLowerCase()) ||
            item.entryDate.toLowerCase().includes(this.search.toLowerCase()) ||
            item.entryTime.toLowerCase().includes(this.search.toLowerCase())
          )
        })
      }
      return filteredData
    },
  },
  methods: {
    selectdate(dates) {
      // Filter data based on selected dates
      // ...
    },
    toggleDropdown() {
      this.isOpen = !this.isOpen
    },
    exportDataToCsv() {
      // Get the filtered data
      const data = this.filteredDesserts1

      // Create a CSV string
      const csv = [
        // Header row
        Object.keys(data[0]).join(','),
      ]

      // Add data rows
      data.forEach(row => {
        csv.push(Object.values(row).join(','))
      })

      // Create a Blob object
      const blob = new Blob([csv.join('\n')], { type: 'text/csv;charset=utf-8;' })

      // Create a link element
      const link = document.createElement('a')

      // Set the download link
      link.href = URL.createObjectURL(blob)
      link.download = 'whatsapp-log.csv'

      // Trigger the download
      link.click()

      // Clean up the link
      URL.revokeObjectURL(link.href)
    },
  },
}
</script>
