<template>
  <div>
    <h2>Home View</h2>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  components: {
  }
})
export default class HomeView extends Vue {}
</script>
