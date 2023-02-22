<template>
  <v-snackbar
    v-model="notify.show"
    :timeout="notify.timer"
  >
    {{ notify.message }}

    <template v-slot:actions>
      <v-btn
        :color="notify.color"
        variant="text"
        @click="reset"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

type Notify = {
  show: boolean,
  color: string,
  message: string,
  icon: string,
  timer: number
}

const defaultConfig = {
  show: false,
  color: 'green',
  message: '',
  icon: '',
  timer: 3000
}

let notify: Notify = reactive({
  ...defaultConfig
})

const reset = () => {
  notify = { ...defaultConfig }
}

const show = (cfg: Notify) => {
  notify = { ...cfg }
}
</script>
