<script lang="ts" >
export default {
  data() {
    return {
      checkbox: false,
      checkbox1: false,
      checkbox2: false,
      selectedfundButton: 'MONTH',
      selectedstockButton: ' e-DIS(OTP on sell)',
    }
  },

  mounted() {
    const funds = [this.$refs.fundButton1, this.$refs.fundButton2] as HTMLButtonElement[]
    const stock = [this.$refs.stockButton1, this.$refs.stockButton2] as HTMLButtonElement[]
  },
  methods: {
    selectFundButton(option: string) {
      this.selectedfundButton = option
      console.log('Selected fund button value:', this.selectedfundButton)
    },
    selectStockButton(option: string) {
      this.selectedstockButton = option
      console.log('Selected stock button value:', this.selectedstockButton)
    },
    navigateBack() {
      this.$router.push('/kycdetails2')
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
      <VCol class="px-3 py-1 pt-4">KYC detail(3/3)</VCol>
      <VCol class="font-bold text-lg py-1">Preferences and Declarations</VCol>
      <VCol class="px-3 py-1">This is required to complete your KYC and securely open your demat account</VCol>

      <VCol>
        <VLabel class="font-bold">Authorization Mode For Selling Stocks:</VLabel>
      </VCol>
      <VRow class="px-3">
        <VCol>
          <button
            ref="stockButton1"
            class="gender-button"
            :class="{ selected: selectedstockButton === 'e-DIS(OTP on sell)' }"
            @click="selectStockButton('e-DIS(OTP on sell)')"
          >
            e-DIS(OTP on sell)
          </button>
          <button
            ref="stockButton2"
            class="gender-button"
            :class="{ selected: selectedstockButton === 'DDPI (No OTP)' }"
            @click="selectStockButton('DDPI (No OTP)')"
          >
            DDPI (No OTP)
          </button>
        </VCol>
      </VRow>
      <VCol class="px-3 text-sm"
        >You can select DOPI if you want to sell stocks instantly without entaring a FIN every time. Learn more</VCol
      >
      <VCol class="">
        <VRow cols="12">
          <VCol cols="1"> <VCheckbox v-model="checkbox" /></VCol>
          <VCol
            cols="11"
            class="mt-2 text-justify"
            >I am an Indian Resident. I am neither a specified US person, US citizen/ green card holder nor a Tax
            resident of any other country</VCol
          >
        </VRow>
      </VCol>
      <VCol class="">
        <VRow cols="12">
          <VCol cols="1"> <VCheckbox v-model="checkbox1" /></VCol>
          <VCol
            cols="11"
            class="mt-2 text-justify"
          >
            I'm not politically exposed or related to a politically-exposed person</VCol
          >
        </VRow>
      </VCol>
      <VCol class="">
        <VRow cols="12">
          <VCol cols="1"> <VCheckbox v-model="checkbox2" /></VCol>
          <VCol
            cols="11"
            class="mt-2 text-justify"
            >I am not dealing with/ through any stock brokers/authorised person & there are no disputes/ dues pending
            from! to them. Further, I hereby confirm that no actions/proceedings have been initiated or are pending
            against me by SEBIU Stock Exchanges or any other authority.</VCol
          >
        </VRow>
      </VCol>
      <VCol class="fixed bottom-0 bg-white">
        <VRow class="">
          <VCol cols="5">
            <VBtn
              class="w-full"
              color="secondary"
              type="reset"
              variant="outlined"
              @click="navigateBack"
            >
              BACK
            </VBtn>
          </VCol>
          <VCol cols="7">
            <VBtn
              class="w-[80%]"
              type="submit"
              to="/nominee"
            >
              PROCEED
            </VBtn>
          </VCol>
        </VRow>
      </VCol>
    </VCol></VRow
  >
</template>
<style lang="scss">
.gender-button {
  padding: 4px 8px;
  border: 1px solid #bfbdc4;
  margin-right: 6px;
  border-radius: 4px;
  border-color: #bfbdc4;
  font-size: 0.875rem;
  font-weight: medium;

  background-color: white;
  color: #bfbdc4;
  &:hover {
    border: 1px solid #2b58a3;
    background-color: #2b58a3;
    color: white; /* Adjust hover background color */
  }
}

/* Styles for the selected gender button */
.gender-button.selected {
  border: 1px solid #2b58a3;
  background-color: #2b58a3; /* Adjust selected background color */
  color: white;
}
</style>
