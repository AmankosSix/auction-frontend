<template>
  <v-card>
    <v-card-title>Home View</v-card-title>
    <v-card-text><router-view /></v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  components: {
  }
})
export default class HomeView extends Vue {}
</script>
