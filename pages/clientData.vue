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
              class="ml-2"
              @click="isDrawerOpen = true"
            >
              <VIcon
                icon="ri-user-add-fill"
                color="red"
                size="22"
            /></v-btn>
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
                  <tr v-if="isLoading">
                    <td>
                      <div class="animate-pulse">
                        <div class="h-8 bg-gray-200 mt-3 mb-8 rounded"></div>
                        <div class="h-8 bg-gray-300 mb-8 rounded"></div>
                        <div class="h-8 bg-gray-200 mb-8 rounded"></div>
                        <div class="h-8 bg-gray-300 mb-8 rounded"></div>
                        <div class="h-8 bg-gray-200 mb-8 rounded"></div>
                      </div>
                    </td>
                    <td>
                      <div class="animate-pulse">
                        <div class="h-8 bg-gray-200 mt-3 mb-8 rounded"></div>
                        <div class="h-8 bg-gray-300 mb-8 rounded"></div>
                        <div class="h-8 bg-gray-200 mb-8 rounded"></div>
                        <div class="h-8 bg-gray-300 mb-8 rounded"></div>
                        <div class="h-8 bg-gray-200 mb-8 rounded"></div>
                      </div>
                    </td>
                    <td>
                      <div class="animate-pulse">
                        <div class="h-8 bg-gray-200 mt-3 mb-8 rounded"></div>
                        <div class="h-8 bg-gray-300 mb-8 rounded"></div>
                        <div class="h-8 bg-gray-200 mb-8 rounded"></div>
                        <div class="h-8 bg-gray-300 mb-8 rounded"></div>
                        <div class="h-8 bg-gray-200 mb-8 rounded"></div>
                      </div>
                    </td>
                    <td>
                      <div class="animate-pulse">
                        <div class="h-8 bg-gray-200 mt-3 mb-8 rounded"></div>
                        <div class="h-8 bg-gray-300 mb-8 rounded"></div>
                        <div class="h-8 bg-gray-200 mb-8 rounded"></div>
                        <div class="h-8 bg-gray-300 mb-8 rounded"></div>
                        <div class="h-8 bg-gray-200 mb-8 rounded"></div>
                      </div>
                    </td>
                  </tr>
                  <tr
                    v-for="item in filteredDesserts"
                    :key="item.dessert"
                    v-else
                  >
                    <td>{{ item.clientCode }}</td>
                    <td>{{ item.branchCode }}</td>
                    <td>{{ item.branchEmail }}</td>
                    <td>
                      <v-btn
                        @click="deleteItem(item)"
                        class="ml-2"
                      >
                        <VIcon
                          icon="ri-delete-bin-fill"
                          color="red"
                          size="22"
                      /></v-btn>
                    </td>
                  </tr>
                </tbody>
              </VTable>
            </VCol>
          </VRow>
        </div>

        <VNavigationDrawer
          v-model="isDrawerOpen"
          temporary
          right
          v-if="isDrawerOpen == true"
        >
          <VCard class="h-screen">
            <VCardTitle class="py-8"> ADD NEW CLIENT </VCardTitle>
            <VCardSubtitle>
              <v-form>
                <v-text-field
                  v-model="createClient.ClientCode"
                  label="Client Code *"
                  required
                  class="py-2"
                ></v-text-field>
                <v-text-field
                  v-model="createClient.ClientEmailId"
                  label="Client Email"
                  required
                  class="py-2"
                ></v-text-field>
                <v-text-field
                  v-model="createClient.ClientMobileno"
                  label="Client Mobile No"
                  required
                  class="py-2"
                ></v-text-field>
                <v-text-field
                  v-model="createClient.BranchCode"
                  required
                  label="Branch Code"
                  class="py-2"
                ></v-text-field>
                <v-text-field
                  v-model="createClient.BranchEmail"
                  label="Branch Email"
                  required
                  class="py-2"
                ></v-text-field>
                <v-text-field
                  v-model="createClient.BranchMobile"
                  label="Branch Mobile No"
                  required
                  class="py-2"
                ></v-text-field>
              </v-form>
            </VCardSubtitle>
            <VCardActions class="py-8">
              <v-spacer></v-spacer>

              <v-btn
                @click="addItem"
                class="ml-2 text-white"
                style="background-color: #2b58a3; border: 1px solid #2b58a3; color: rgb(252, 249, 249)"
                >ADD</v-btn
              >
              <v-btn
                @click="isDrawerOpen = false"
                color="secondary border mr-3"
                >CANCEL</v-btn
              >
            </VCardActions>
          </VCard>
        </VNavigationDrawer>
      </div>
    </VContainer>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
const isLoading = ref(false)
const isDrawerOpen = ref(false) // Initially closed
const createClient = ref({
  ClientCode: '',
  ClientEmailId: '',
  ClientMobileno: '',
  BranchCode: '',
  BranchEmail: '',
  BranchMobile: '',
})

const addItem = async () => {
  if (createClient.value.ClientCode) {
    const formData = new FormData()
    formData.append('ClientCode', createClient.value.ClientCode)
    formData.append('ClientEmailId', createClient.value.ClientEmailId)
    formData.append('ClientMobileno', createClient.value.ClientMobileno)
    formData.append('BranchCode', createClient.value.BranchCode)
    formData.append('BranchEmail', createClient.value.BranchEmail)
    formData.append('BranchMobile', createClient.value.BranchMobile)
    const response = await axios.post('https://g1.gwcindia.in/powerstocks/powerstocks-client-entry.php', formData)

    createClient.value = {
      ClientCode: '',
      ClientEmailId: '',
      ClientMobileno: '',
      BranchCode: '',
      BranchEmail: '',
      BranchMobile: '',
    } // Reset form
    isDrawerOpen.value = false
    Swal.fire({
      icon: 'success',
      title: 'Client Added',
      text: 'The client has been added successfully!',
    })
    fetchData() // Close the drawer
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong while creating the client. Please try again.',
    })
    alert('Please fill out all fields.')
  }
}
const fetchData = async () => {
  isLoading.value = true
  try {
    const formData = new FormData()
    formData.append('authKey', '0a7cb27e52927eacabbb7ecc738b0fea50b3967945257c43a67eb753cb465bd0')

    const response = await axios.post('https://g1.gwcindia.in/powerstocks/powerstocks-client-data.php', formData)

    // Debug after successful response
    console.log(response.data, 'response.data') // Ensure this logs the expected data structure

    desserts.value = response.data.map(item => ({
      clientCode: item.clientCode,
      branchCode: item.branchCode,
      branchEmail: item.branchEmail,
    }))
  } catch (err) {
    console.error('Error:', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchData()
})
// Data
const search = ref('')
const desserts = ref([])

// Computed property to filter the desserts array based on the search query
const filteredDesserts = computed(() => {
  if (!search.value) {
    return desserts.value
  }
  console.log(desserts.value, 'desserts.value')
  const query = search.value.toLowerCase()
  return desserts.value.filter(
    item =>
      item.clientCode.toLowerCase().includes(query) ||
      item.branchCode.toLowerCase().includes(query) ||
      item.branchEmail.toLowerCase().includes(query),
  )
})

// Methods
const deleteItem = itemToDelete => {
  try {
    const formData = new FormData()
    formData.append('authKey', '0a7cb27e52927eacabbb7ecc738b0fea50b3967945257c43a67eb753cb465bd0')
    formData.append('clientCode', itemToDelete.clientCode)
    const response = axios.post('https://g1.gwcindia.in/powerstocks/powerstocks-remove-client.php', formData)

    console.log('Client deleted successfully:', response.data)
    Swal.fire({
      icon: 'success',
      title: 'Client Deleted',
      text: 'The client has been deleted successfully!',
    })
  } catch (error) {
    // Handle errors (e.g., show an error message)
    console.error('Error deleting client:', error)
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong while deleting the client. Please try again.',
    })
  } finally {
    search.value = ''
    fetchData()
  }
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
.v-navigation-drawer {
  /* Set the default position */
  right: 0 !important;
  left: auto !important;
  position: fixed !important;
  /* Optional: adjust width as needed */
  width: 30% !important;
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
.custom-add-button {
  background-color: #2b58a3;
  border: 1px solid #2b58a3;
  color: rgb(252, 249, 249);
}
.cursor-pointer {
  cursor: pointer;
}
</style>
