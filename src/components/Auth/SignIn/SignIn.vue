<template>
  <v-container fluid>
    <v-sheet width="400" class="bg-blue-grey-lighten-5 mx-auto pa-5" rounded>
      <h4 class="text-h5 font-weight-bold mb-4 text-center">Authentication</h4>
      <v-form fast-fail>
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
import { AuthService, SingIn, SingInResponse } from '@/service/AuthService'

const show = false

const initUser: SingIn = {
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
  const res = await aS.SignIn<SingInResponse>(user)
  if ('accessToken' in res.response) {
    localStorage.setItem('token', res.response.accessToken)
  }
}
</script>
