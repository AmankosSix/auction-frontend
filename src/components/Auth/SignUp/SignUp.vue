<template>
  <v-sheet class="bg-blue-grey-lighten-5 mx-auto pa-5" rounded>
    <v-card
      class="mx-auto"
      max-width="344"
      title="User Registration"
    >
      <v-container>
        <v-text-field
          v-model="user.name"
          label="Your name"
          hint="Enter your name"
          clearable
          :rules="nameRules"
        ></v-text-field>

        <v-text-field
          v-model="user.phone"
          label="Phone number"
          hint="Enter your phone number"
          clearable
          :rules="phoneRules"
        ></v-text-field>

        <v-text-field
          v-model="user.email"
          label="Email"
          hint="Enter your email"
          clearable
          :rules="emailRules"
        ></v-text-field>

        <v-text-field
          v-model="user.password"
          label="Password"
          type="password"
          hint="Enter your password"
          clearable
          :rules="passwordRules"
        ></v-text-field>
      </v-container>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="success" @click="submit">
          Sign up
          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-sheet>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { AuthService, SignUp, SignUpResponse } from '@/service/AuthService'

const initUser: SignUp = {
  name: '',
  email: '',
  phone: '',
  password: ''
}
const user = reactive(initUser)

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

async function submit () {
  const aS = new AuthService()
  await aS.SignUp<SignUpResponse>(user)
}
</script>
