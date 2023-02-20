<template>
  <div>
    <h2>Auth View</h2>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  components: {
  }
})
export default class AuthView extends Vue {}
</script>
