<script lang="ts">
export default {
  data() {
    return {
      panNumber: '',
      checkbox: false,
      checkbox1: false,
      isDialogVisible: false,
      emailErrors: [],
    }
  },
  methods: {
    proceed() {
      if (this.checkbox && this.checkbox1 && this.panNumber.trim() !== '') {
        this.isDialogVisible = true
      } else {
        this.emailErrors.push('Please enter PAN Number.')
      }
    },
    route() {
      this.$emit('next-page', 'SecondStep-2')
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
      <VCol class="font-bold text-lg py-1">Fill Your PAN Details</VCol>
      <VCol class="py-1">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</VCol>
      <VCol
        cols="12"
        class="py-1 px-1"
      >
        <VCol
          cols="12"
          md="12"
          class="text-sm"
        >
          <label for="panNumber">Enter PAN</label>
        </VCol>
        <VCol cols="12">
          <VTextField
            id="panNumber"
            v-model="panNumber"
            placeholder="fewyge3674"
            persistent-placeholder
            :error-messages="emailErrors"
          />
        </VCol>
      </VCol>
      <VCol class="">
        <VRow cols="12">
          <VCol cols="1"> <VCheckbox v-model="checkbox" /></VCol>
          <VCol
            cols="11"
            class="mt-2 text-justify"
          >
            I agree Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed quis molestias necessitatibus. Dolores
            dolor reiciendis, consequuntur laborum, eum illo suscipit! Id.
          </VCol>
        </VRow>
      </VCol>
      <VCol class="">
        <VRow cols="12">
          <VCol cols="1"> <VCheckbox v-model="checkbox1" /></VCol>
          <VCol
            cols="11"
            class="mt-2 text-justify"
          >
            I agree Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sed quis molestias ..
          </VCol>
        </VRow>
      </VCol>
      <VCol
        cols="12"
        class="pt-5"
      >
        <VBtn
          block
          @click="proceed"
          >PROCEED</VBtn
        >
      </VCol>
      <VDialog
        v-model="isDialogVisible"
        width="500"
      >
        <VCard class="py-3">
          <VCol class="text-xl font-bold text-black d-flex justify-center py-1">Proceed With PAN</VCol>
          <VCol class="text-xl font-bold text-black d-flex justify-center py-1">AURTDDSJ3243VNDSF</VCol>
          <VCol class="d-flex justify-center text-center items-center py-1">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum minus animi blanditiis sit quae quod expedita
            totam rerum, magnam iste nam, accusantium officiis quis quaerat iure ea voluptatibus dignissimos nisi!
          </VCol>
          <VCol cols="12">
            <VBtn
              block
              type="submit"
              @click="route"
              >PROCEED</VBtn
            >
          </VCol>
          <VCol
            cols="12"
            class="pb-12"
          >
            <VBtn
              block
              color="secondary"
              type="reset"
              variant="outlined"
              >CHANGE PAN</VBtn
            >
          </VCol>
        </VCard>
      </VDialog>
    </VCol>
  </VRow>
</template>

<style lang="scss">
</style>
