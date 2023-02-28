<template>
  <v-sheet class="bg-blue-grey-lighten-5 mx-auto pa-5 h-100">
    <v-card
      class="mx-auto"
      max-width="344"
      title="User Registration"
    >
      <v-container>
        <v-text-field
          v-model="name.value.value"
          :error-messages="name.errorMessage.value"
          label="Your name"
          hint="Enter your name"
          clearable
        ></v-text-field>

        <v-text-field
          v-model="phone.value.value"
          :error-messages="phone.errorMessage.value"
          label="Phone number"
          hint="Enter your phone number"
          prefix="+7"
          clearable
        ></v-text-field>

        <v-text-field
          v-model="email.value.value"
          :error-messages="email.errorMessage.value"
          label="Email"
          hint="Enter your email"
          clearable
        ></v-text-field>

        <v-text-field
          v-model="password.value.value"
          :error-messages="password.errorMessage.value"
          label="Password"
          type="password"
          hint="Enter your password"
          clearable
        ></v-text-field>

        <p class="font-weight-light">
          Already have an account? <router-link :to="{ name: 'SignIn' }" class="text-blue-grey-darken-1 text-decoration-none">Sign in.</router-link>
        </p>
      </v-container>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn color="grey" @click="handleReset">
          <v-icon icon="mdi-close" start></v-icon>

          Clear
        </v-btn>

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
import { AccountService, Response, SignUp } from '@/service/AccountService'
import { useField, useForm } from 'vee-validate'
import { CommonMutationTypes as CMT } from '@/store/common/mutations-types'
import { useStore } from '@/store'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    name (value: string) {
      if (value?.length > 64) {
        return 'Name needs to be at maximum 64 characters.'
      }

      if (value?.length >= 2) {
        return true
      }

      return 'Name needs to be at least 2 characters.'
    },
    email (value: string) {
      if (value?.length > 64) {
        return 'Email needs to be at maximum 64 characters.'
      }

      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) {
        return true
      }

      return 'Must be a valid e-mail.'
    },
    phone (value: string) {
      if (value?.length === 10 && /[0-9-]+/.test(value)) return true

      return 'Phone number needs to be 10 digits.'
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

const name = useField('name')
const email = useField('email')
const phone = useField('phone')
const password = useField('password')

const submit = handleSubmit(async values => {
  const { name, email, phone, password } = values
  const user: SignUp = { name, email, phone, password }
  const aS = new AccountService()
  const res = await aS.SignUp<Response>(user)
  if (!('errorCode' in res.response)) {
    await router.push({ name: 'SignIn' })

    await store.commit(CMT.SET_SNACKBAR, {
      color: 'green',
      message: res.response.message
    })
  }
})
</script>
