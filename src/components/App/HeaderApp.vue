<template>
  <v-toolbar-title>Auction Frontend</v-toolbar-title>

  <v-btn v-if="!isMobile" class="mx-4" icon="mdi-menu" @click="$emit('update:modelValue', !modelValue)"></v-btn>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  modelValue: Boolean,
  isMobile: Boolean
})

defineEmits(['update:modelValue'])
</script>
