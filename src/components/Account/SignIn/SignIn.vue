<template>
  <v-sheet class="bg-blue-grey-lighten-5 mx-auto pa-5 h-100">
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

          <p class="font-weight-light">
            New to Car Auction? <router-link :to="{ name: 'SignUp' }" class="text-blue-grey-darken-1 text-decoration-none">Create an account.</router-link>
          </p>

          <v-switch
            label="Are you an employee?"
            color="info"
            value="info"
            hide-details
            @update:modelValue="aS.setStaff(!!$event)"
          ></v-switch>
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
import { AccountService, SignIn, SignInResponse } from '@/service/AccountService'
import { useField, useForm } from 'vee-validate'
import { useRouter } from 'vue-router'
import { CommonMutationTypes as CMT } from '@/store/common/mutations-types'
import { UserMutationTypes as UMT } from '@/store/user/mutations-types'
import { GetAllRoles, GetUserInfo } from '@/helpers/authInit'
import { useStore } from '@/store'

const store = useStore()
const router = useRouter()

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

const aS = new AccountService()

const submit = handleSubmit(async values => {
  const { email, password } = values
  const user: SignIn = { email, password }
  const res = await aS.SignIn<SignInResponse>(user)
  if (!('errorCode' in res.response)) {
    await store.commit(CMT.SET_SNACKBAR, {
      color: 'green',
      message: 'You authenticated successfully',
      icon: 'check-circle-outline'
    })

    await store.commit(UMT.SET_TOKEN, res.response.accessToken)

    await GetUserInfo()
    await GetAllRoles()

    await router.push({ name: 'HomeComponent' })
  }
})
</script>
