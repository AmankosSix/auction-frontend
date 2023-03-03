<template>
  <router-link :to="{ name: 'HomeComponent' }">
    <v-img
      :src="logo"
      height="27"
      max-width="255"
      min-width="200"
      class="ml-2"
    ></v-img>
  </router-link>

  <v-spacer></v-spacer>

  <v-btn class="d-flex d-md-none" icon="mdi-menu" @click="$emit('update:modelValue', !modelValue)"></v-btn>
</template>

<script lang="ts" setup>
import logo from '@/assets/images/logo-white.svg'

defineProps<{
  modelValue: boolean
}>()

defineEmits(['update:modelValue'])
</script>
