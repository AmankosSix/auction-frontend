<template>
  <v-sheet class="bg-blue-grey-lighten-5 mx-auto pa-5" rounded>
    <v-card
      class="mx-auto"
      max-width="344"
      title="User Registration"
    >
      <v-container>
        <v-text-field
          v-model="form.name"
          label="Your name"
          hint="Enter your name"
          clearable
          :rules="nameRules"
        ></v-text-field>

        <v-text-field
          v-model="form.phone"
          label="Phone number"
          hint="Enter your phone number"
          clearable
          :rules="phoneRules"
        ></v-text-field>

        <v-text-field
          v-model="form.email"
          label="Email"
          hint="Enter your email"
          clearable
          :rules="emailRules"
        ></v-text-field>

        <v-text-field
          v-model="form.password"
          label="Password"
          type="password"
          hint="Enter your password"
          clearable
          :rules="passwordRules"
          @click:append="show = !show"
        ></v-text-field>
      </v-container>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="success" @click="submit">
          Complete Registration

          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-sheet>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const show = false

const form = reactive({
  name: '',
  phone: '',
  email: '',
  password: ''
})

const nameRules = [
  (value: never) => {
    if (value) return true

    return 'Name is required.'
  }
]

const phoneRules = [
  (value: never) => {
    if (value) return true

    return 'Phone is required.'
  }
]

const emailRules = [
  (value: never) => {
    if (value) return true

    return 'E-mail is required.'
  },
  (value: string) => {
    if (/.+@.+\..+/.test(value)) return true

    return 'E-mail must be valid.'
  }
]

const passwordRules = [
  (value: never) => {
    if (value) return true

    return 'Password is required.'
  },
  (value: string) => {
    if (/[^0-9]/.test(value)) return true
    return 'Last name can not contain digits.'
  }
]

const submit = () => {
  console.log('it\'s submitted', form)
}
</script>
