<template>
  <v-sheet class="bg-blue-grey-lighten-5 mx-auto pa-5 h-100" rounded>
    <v-card
      class="mx-auto"
      max-width="344"
      title="Authentication"
    >
      <form @submit.prevent="submit">
        <v-container>
          <v-text-field
            v-model="email.value.value"
            :error-messages="email.errorMessage.value"
            id="email"
            label="Email"
            hint="Enter your email to access this website"
            clearable
          ></v-text-field>

          <v-text-field
            v-model="password.value.value"
            :error-messages="password.errorMessage.value"
            id="password"
            label="Password"
            type="input"
            hint="Enter your password to access this website"
            clearable
          ></v-text-field>
        </v-container>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn color="grey" @click="handleReset">
            <v-icon icon="mdi-close" start></v-icon>

            Clear
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn color="green" type="submit">
            Sign In

            <v-icon icon="mdi-chevron-right" end></v-icon>
          </v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </v-sheet>
</template>

<script lang="ts" setup>
import { AuthService, SignIn, SignInResponse } from '@/service/AuthService'
import { useField, useForm } from 'vee-validate'

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    email (value: string) {
      if (value?.length > 64) {
        return 'Email needs to be at maximum 64 characters.'
      }

      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) {
        return true
      }

      return 'Must be a valid e-mail.'
    },
    password (value: string) {
      if (value?.length > 64) {
        return 'Password needs to be at maximum 64 characters.'
      }

      if (value?.length >= 8) {
        return true
      }

      return 'Password needs to be at least 8 characters.'
    }
  }
})

const email = useField('email')
const password = useField('password')

const submit = handleSubmit(async values => {
  const { email, password } = values
  const user: SignIn = { email, password }
  const aS = new AuthService()
  const res = await aS.SignIn<SignInResponse>(user)
  if ('accessToken' in res.response) {
    localStorage.setItem('token', res.response.accessToken)
  }
})
</script>
