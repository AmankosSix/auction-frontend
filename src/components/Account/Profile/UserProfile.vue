<template>
  <v-sheet class="bg-blue-grey-lighten-5 mx-auto pa-5 h-100">
    <v-card
      class="mx-auto"
      max-width="344"
    >
      <v-card-title class="d-flex align-center">
        <v-icon icon="mdi-account" color="blue-grey-darken-1" start></v-icon>
        <span>User Profile</span>
      </v-card-title>
      <form @submit.prevent="submit">
        <v-container>
          <v-text-field
            v-model="name.value.value"
            label="Your name"
            variant="underlined"
            :readonly="!editMode"
          ></v-text-field>

          <v-text-field
            v-model="phone.value.value"
            label="Phone"
            variant="underlined"
            prefix="+7"
            :readonly="!editMode"
          ></v-text-field>

          <v-text-field
            :model-value="user?.email"
            label="Email"
            variant="underlined"
            readonly
          ></v-text-field>

        </v-container>

        <v-divider></v-divider>

        <v-card-actions>
          <v-btn v-if="editMode" color="grey" @click="close">
            <v-icon icon="mdi-close" start></v-icon>

            Close
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn v-if="editMode" color="green" type="submit">
            Update Profile

            <v-icon icon="mdi-check" end></v-icon>
          </v-btn>

          <v-btn v-else color="green" @click="editMode = !editMode">
            Edit Profile

            <v-icon icon="mdi-pencil" end></v-icon>
          </v-btn>
        </v-card-actions>
      </form>
    </v-card>
  </v-sheet>
</template>

<script lang="ts" setup>

import { computed, ref, onMounted } from 'vue'
import { useStore } from '@/store'
import { useField, useForm } from 'vee-validate'
import { AccountService, Response, UserUpdateInfo } from '@/service/AccountService'
import { CommonMutationTypes as CMT } from '@/store/common/mutations-types'
import { GetUserInfo } from '@/helpers/authInit'

const editMode = ref(false)

const store = useStore()

const user = computed(() => store.getters.user)

onMounted(() => {
  reset()
})

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
    phone (value: string) {
      if (value?.length === 10 && /[0-9-]+/.test(value)) return true

      return 'Phone number needs to be 10 digits.'
    }
  }
})

const name = useField('name')
const phone = useField('phone')

const submit = handleSubmit(async values => {
  const { name, phone } = values
  const form: UserUpdateInfo = { name, phone }
  const aS = new AccountService()
  const res = await aS.UpdateUserInfo<Response>(user.value.uuid, form)
  if (!('errorCode' in res.response)) {
    await store.commit(CMT.SET_SNACKBAR, {
      color: 'green',
      message: res.response.message
    })

    await GetUserInfo()

    reset()
    close()
  }
})

const reset = () => {
  name.resetField({
    value: user.value.name
  })
  phone.resetField({
    value: user.value.phone
  })
}

const close = () => {
  handleReset()
  editMode.value = false
}
</script>
