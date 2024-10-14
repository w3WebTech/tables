<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
    >
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <v-img
              :width="207"
              aspect-ratio="16/9"
              cover
              src="https://powerstocks.gwcindia.in/Img/Power%20Stocks%20Logo%20Final%20Feb%202024%201.jpg"
            ></v-img>
          </div>
        </template>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 font-weight-semibold mb-1">Welcome to Powerstocks! 👋🏻</h5>
        <p class="mb-0">Please sign-in to your account and start the adventure</p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="() => {}">
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="form.email"
                label="Email"
                type="email"
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="form.password"
                label="Password"
                placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'ri-eye-off-line' : 'ri-eye-line'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />
            </VCol>
            <!-- remember me checkbox -->
            <VRow>
              <VCol cols="2"
                ><div
                  class="text-[15px]"
                  style="margin-left: 10px; margin-top: 12px"
                  v-if="showOtp == true"
                >
                  OTP
                </div></VCol
              >
              <VCol cols="10">
                <div class="flex justify-center">
                  <div
                    id="inputs"
                    class="inputs"
                    v-if="showOtp == true"
                  >
                    <input
                      class="input"
                      type="text"
                      inputmode="numeric"
                      maxlength="1"
                      @input="handleInput($event, 0)"
                    />
                    <input
                      class="input"
                      type="text"
                      inputmode="numeric"
                      maxlength="1"
                      @input="handleInput($event, 1)"
                    />
                    <input
                      class="input"
                      type="text"
                      inputmode="numeric"
                      maxlength="1"
                      @input="handleInput($event, 2)"
                    />
                    <input
                      class="input"
                      type="text"
                      inputmode="numeric"
                      maxlength="1"
                      @input="handleInput($event, 3)"
                    />
                  </div>
                </div>
              </VCol>
            </VRow>

            <VCol cols="12">
              <!-- login button -->
              <VBtn
                block
                type="submit"
                :disabled="!isValidForm"
                @click="handleLogin"
              >
                Login
              </VBtn>
            </VCol>
            <VCol cols="12">
              <div
                block
                type="TEXT"
                class="py-2 border border-[#92b9b9] text-black flex justify-center rounded-md"
              >
                IP Address : {{ userIp }}
              </div>
            </VCol>

            <!-- create account -->
            <!-- <VCol
              cols="12"
              class="text-center text-base"
            >
              <span>New on our platform?</span>
              <NuxtLink
                class="text-primary ms-2"
                to="/register"
              >
                Create an account
              </NuxtLink>
            </VCol> -->

            <!-- <VCol
              cols="12"
              class="d-flex align-center"
            >
              <VDivider />
              <span class="mx-4">or</span>
              <VDivider />
            </VCol> -->

            <!-- auth providers -->
            <VCol
              cols="12"
              class="text-center"
            >
              <!-- <AuthProvider /> -->
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>

    <VImg
      class="auth-footer-mask d-none d-md-block"
      :src="authThemeMask"
      style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover"
    />
    <VImg
      class="auth-footer-start-tree"
      :src="authV1Tree"
      :width="250"
      style="position: absolute; top: 50%; left: 0; transform: translateY(-50%)"
    />

    <VImg
      :src="authV1Tree2"
      class="auth-footer-end-tree"
      :width="350"
      style="position: absolute; top: 50%; right: 0; transform: translateY(-50%)"
    />
  </div>
</template>
<style lang="scss" >
@use '@core/scss/pages/page-auth.scss';
[type='text'],
input:where(:not([type])),
[type='email'],
[type='url'],
[type='password'],
[type='number'],
[type='date'],
[type='datetime-local'],
[type='month'],
[type='search'],
[type='tel'],
[type='time'],
[type='week'],
[multiple],
textarea,
select {
  --tw-ring-color: none !important;
}
.container {
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // min-height: 100vh;
}

.input {
  width: 55px;
  height: 48px;
  border-radius: 6px;
  border: 1px solid rgba(161, 159, 159, 0.5);
  margin: 0 10px;
  text-align: center;
  font-size: 15px;
  cursor: not-allowed;
  pointer-events: none;
}

.input:focus {
  border: 2px solid #2b58a3;
  outline: none;
}

.input:nth-child(1) {
  cursor: pointer;
  pointer-events: all;
}
</style>
<script setup lang="ts">
import { useTheme } from 'vuetify'
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import logo from '@images/logo.svg?raw'
import authV1MaskDark from '@images/pages/auth-v1-mask-dark.png'
import authV1MaskLight from '@images/pages/auth-v1-mask-light.png'
import authV1Tree2 from '@images/pages/auth-v1-tree-2.png'
import authV1Tree from '@images/pages/auth-v1-tree.png'
import { ref } from 'vue'
import { userDataStore } from '~/stores/tableData'
const userStore = userDataStore()
const router = useRouter()
let allowedIps = ref([])
let allowedOtps = ref([])
let userIp = ref('')
let userIdArray = ref([])

const otp = ref('')
let arrr = ref([])

console.log(arrr, 'arrr')

onMounted(() => {
  debugger
  if (document.getElementById('inputs')) {
    inputs.value = document.getElementById('inputs')

    inputs.value.addEventListener('input', function (e) {
      const target = e.target
      const val = target.value

      if (isNaN(val)) {
        target.value = ''
        return
      }

      if (val != '') {
        arrr.value.push(val)
        const next = target.nextElementSibling
        if (next) {
          next.focus()
        }
      }

      // Update the OTP value
      const otpValues = Array.from(inputs.value.children).map(input => input.value)
      otp.value = otpValues.join('')
    })

    inputs.value.addEventListener('keyup', function (e) {
      const target = e.target
      const key = e.key.toLowerCase()

      if (key == 'backspace' || key == 'delete') {
        target.value = ''
        const prev = target.previousElementSibling
        if (prev) {
          prev.focus()
        }
        return
      }

      // Update the OTP value
      const otpValues = Array.from(inputs.value.children).map(input => input.value)
      otp.value = otpValues.join('')
    })
  }

  console.log(otp.value, 'inputs')
})

const isValidEmail = (email: string) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email)
}

const isValidPassword = (password: string) => {
  return password.length === 6
}
const handleInput = (event, index) => {
  const target = event.target
  const val = target.value

  // Check if the input value is valid (numeric and length 1)
  if (!/^\d$/.test(val)) {
    target.value = '' // Reset if invalid
    return
  }

  // Update the OTP array
  arrr.value[index] = val // Store value at specific index
  const nextInput = target.nextElementSibling

  // Move focus to the next input if available
  if (nextInput) {
    nextInput.focus()
  }

  // Update the OTP value
  updateOtpValue()
}

const updateOtpValue = () => {
  otp.value = arrr.value.join('') // Join the values for OTP
}

// For backspace handling, you can use the keyup event
const handleKeyUp = (event, index) => {
  const target = event.target
  const key = event.key.toLowerCase()

  if (key === 'backspace') {
    if (target.value === '') {
      // Focus the previous input when backspace is pressed on empty field
      const prevInput = target.previousElementSibling
      if (prevInput) {
        prevInput.focus()
      }
    }
    // Clear the corresponding index in the OTP array
    arrr.value[index] = ''
    updateOtpValue()
  }
}

let showOtp = ref(false)
const isValidForm = computed(() => {
  return isValidEmail(form.value.email) && isValidPassword(form.value.password)
})
onMounted(async () => {
  const response = await axios.get('https://api.ipify.org?format=json')
  userIp.value = response.data.ip
  console.log(userIp.value, 'userIp')
})
const handleLogin = async () => {
  debugger
  const response = await axios.get('https://api.ipify.org?format=json')
  console.log(response.data.ip, response.data, 'response.data.ip')
  const clientIp = response.data.ip
  if (allowedIps.includes(clientIp)) {
    const enteredEmail = form.value.email
    const enteredPassword = form.value.password

    const foundUser = userIdArray.find(user => user.eMail === enteredEmail && user.passWord === enteredPassword)

    if (foundUser) {
      userStore.setUser(enteredEmail, enteredPassword)

      router.push('/tableData')
    } else {
      alert('Invalid email or password')
    }
  } else {
    debugger
    showOtp.value = true

    if (allowedOtps.includes(otp.value)) {
      const enteredEmail = form.value.email
      const enteredPassword = form.value.password

      const foundUser = userIdArray.find(user => user.eMail === enteredEmail && user.passWord === enteredPassword)

      if (foundUser) {
        userStore.setUser(enteredEmail, enteredPassword)

        router.push('/tableData')
      } else {
        alert('Invalid email or password')
      }
    } else if (otp.value != '' && !allowedOtps.includes(otp.value)) {
      alert('Invalid OTP ! , Please Enter Valid One !!!')
    }
  }
}
const getIp = async () => {
  try {
    const response = await axios.get('https://g1.gwcindia.in/powerstocks/ipadress.php')
    allowedIps = response.data.ips
    allowedOtps = response.data.otps
    // Debug after successful response
    console.log(response.data, 'response.data') // Ensure this logs the expected data structure
  } catch (err) {
    console.error('Error:', err)
  } finally {
  }
}
const getId = async () => {
  try {
    const response = await axios.get('https://g1.gwcindia.in/powerstocks/userId.php')
    userIdArray = response.data
    // Debug after successful response
    console.log(response.data, 'response.data.id') // Ensure this logs the expected data structure
  } catch (err) {
    console.error('Error:', err)
  } finally {
  }
}
getIp()
getId()
const form = ref({
  email: '',
  password: '',
  remember: false,
})

const vuetifyTheme = useTheme()

const authThemeMask = computed(() => {
  return vuetifyTheme.global.name.value === 'light' ? authV1MaskLight : authV1MaskDark
})

const isPasswordVisible = ref(false)

definePageMeta({ layout: 'blank' })
</script>
