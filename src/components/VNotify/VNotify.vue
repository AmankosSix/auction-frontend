<template>
  <v-snackbar
    v-for="snackbar in snackbars"
    :key="snackbar.id"
    v-model="snackbar.show"
    :timeout="snackbar.timer"
    color="blue-grey-darken-3"
  >
    <v-icon
      v-if="snackbar.icon"
      :icon="`mdi-${snackbar.icon}`"
      start
      :color="snackbar.color"
    ></v-icon>

    {{ snackbar.message }}

    <template v-slot:actions>
      <v-btn
        :color="snackbar.color"
        variant="text"
        @click="removeSnackbar(snackbar.id)"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from '@/store'
import { CommonMutationTypes as CMT } from '@/store/common/mutations-types'

const store = useStore()
const snackbars = computed(() => store.getters.snackbars)
const removeSnackbar = (id: number) => store.commit(CMT.RESET_SNACKBAR, id)
</script>
