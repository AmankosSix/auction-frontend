<template>
  <v-sheet class="bg-blue-grey-lighten-5 mx-auto pa-5" rounded>
    <v-card
      class="mx-auto"
      max-width="344"
      title="Authentication"
    >
      <v-container>
        <v-text-field
          v-model="user.email"
          id="email"
          label="Email"
          hint="Enter your email to access this website"
          clearable
          :rules="emailRules"
        ></v-text-field>

        <v-text-field
          v-model="user.password"
          id="password"
          label="Password"
          type="input"
          hint="Enter your password to access this website"
          clearable
          :rules="passwordRules"
        ></v-text-field>
      </v-container>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="success" @click="submit">
          Sign In

          <v-icon icon="mdi-chevron-right" end></v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-sheet>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { AuthService, SignIn, SignInResponse } from '@/service/AuthService'

const initUser: SignIn = {
  email: '',
  password: ''
}
const user = reactive(initUser)

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

async function submit () {
  const aS = new AuthService()
  const res = await aS.SignIn<SignInResponse>(user)
  if ('accessToken' in res.response) {
    localStorage.setItem('token', res.response.accessToken)
  }
}
</script>
