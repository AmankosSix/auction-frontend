<template>
  <h3>Home</h3>
  {{ user }}
</template>

<script lang="ts" setup>
import { useStore } from '@/store'
import { computed } from 'vue'

const store = useStore()

const user = computed(() => store.getters.user)
</script>
