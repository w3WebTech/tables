<script lang="ts" >
export default {
  data() {
    return {
      emailAddress: '',
      isValidEmail: false,
      isError: false,
      isMobileNumberValid: false,
      mobileNumber: '',
      emailErrors: [],
    }
  },
  methods: {
    validateEmail() {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
      this.isValidEmail = emailRegex.test(this.emailAddress)
      this.emailErrors = []
      if (this.isValidEmail == false) {
        this.isError = true
        this.emailErrors.push('Enter Valid Email')
      } else {
        this.$router.push('/mainpage-2')
      }
    },
    validateMobileNumber() {
      const mobileNumberRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
      return mobileNumberRegex.test(this.mobileNumber)
    },
    navigateBack() {
      this.$router.push('/otp')
    },
  },
}
</script>

<template>
  <VRow>
    <VCol
      cols="12"
      md="6"
    >
      <VRow>
        <!-- <VCol
          cols="12"
          md="6"
        >
          <IconBtn class="">
            <VIcon icon="ri-arrow-left-line" />
          </IconBtn>
        </VCol> -->
      </VRow>
      <VRow class="pt-5">
        <VCol
          cols="12"
          md="6"
          class="px-6"
        >
          <img
            src="@/public/envelop.jpeg"
            alt=""
            class="h-10 w-10" /></VCol
      ></VRow>
      <VRow>
        <VCol
          cols="12"
          md="6"
          class="px-6"
        >
          <VLabel class="font-bold text-sm">Add Email Address</VLabel>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. <br />Temporibus fugit alias dignissimos illo
            repellendus praesentium.
          </p>
        </VCol></VRow
      >
      <VRow class="pb-3 px-4">
        <VCol cols="12">
          <VTextField
            v-model="emailAddress"
            prepend-inner-icon="ri-mail-line"
            label="Email"
            type="email"
            :error-messages="emailErrors"
            placeholder="johndoe@example.com"
          /> </VCol
      ></VRow>

      <VCol
        class="fixed bottom-0"
        cols="12"
      >
        <VRow>
          <VCol cols="2">
            <VBtn
              class="w-full"
              color="primary"
              type="reset"
              @click="navigateBack"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="white"
                class="size-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.03 3.97a.75.75 0 0 1 0 1.06l-6.22 6.22H21a.75.75 0 0 1 0 1.5H4.81l6.22 6.22a.75.75 0 1 1-1.06 1.06l-7.5-7.5a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 0 1 1.06 0Z"
                  clip-rule="evenodd"
                />
              </svg>
            </VBtn>
          </VCol>
          <VCol cols="10">
            <VBtn
              class="w-[85%]"
              color="primary"
              type="reset"
              @click="validateEmail"
            >
              verify Email Address
            </VBtn>
          </VCol>
        </VRow>
      </VCol>
    </VCol></VRow
  >
</template>
<style lang="scss">
</style>
