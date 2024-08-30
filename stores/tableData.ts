import axios from 'axios'
import { defineStore } from 'pinia'
export const useTodosStore = defineStore('todos', {
  state: () => ({
    todos: [],
  }),
  actions: {
    // async fetchTodos() {
    //   // Example API call to fetch todos
    //   const response = await fetch('https://jsonplaceholder.typicode.com/todos')
    //   const data = await response.json()
    // = data
    // },
    async fetchTodos () {
 
        try {
          const formData = new FormData()
          formData.append('authKey', '0a7cb27e52927eacabbb7ecc738b0fea50b3967945257c43a67eb753cb465bd0')
      
          const response = await axios.post('https://g1.gwcindia.in/powerstocks/powerstocks-client-data.php', formData)
          this.todos =response.data
          // Debug after successful response
          console.log(response.data, 'response.data') // Ensure this logs the expected data structure
      
        //   desserts.value = response.data.map(item => ({
        //     clientCode: item.clientCode,
        //     branchCode: item.branchCode,
        //     branchEmail: item.branchEmail,
        //   }))
        } catch (err) {
          console.error('Error:', err)
        } finally {
       
        }
      }
      
  },
})
