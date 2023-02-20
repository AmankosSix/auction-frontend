<template>
  <v-container fluid>
    <v-sheet width="300" class="mx-auto">
      <h4 class="text-h5 font-weight-bold mb-4 text-center">Authentication</h4>
      <v-form fast-fail>
        <v-text-field
          v-model="form.email"
          label="Email"
          hint="Enter your email to access this website"
          clearable
          :rules="emailRules"
        ></v-text-field>

        <v-text-field
          v-model="form.password"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          label="Password"
          type="input"
          hint="Enter your password to access this website"
          clearable
          :rules="passwordRules"
          @click:append="show = !show"
        ></v-text-field>

        <v-btn block class="mt-2" @click="submit">Submit</v-btn>
      </v-form>
    </v-sheet>
  </v-container>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const show = false

const form = reactive({
  email: '',
  password: ''
})

const emailRules = [
  (value: never) => {
    if (value) return true

    return 'E-mail is requred.'
  },
  (value: string) => {
    if (/.+@.+\..+/.test(value)) return true

    return 'E-mail must be valid.'
  }
]

const passwordRules = [
  (value: string) => {
    if (/[^0-9]/.test(value)) return true
    return 'Last name can not contain digits.'
  }
]

const submit = () => {
  console.log('it\'s submitted')
}
</script>
