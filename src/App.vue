<template>
  <v-card>
    <v-layout>
      <v-app-bar color="surface-variant" title="Auction Frontend"></v-app-bar>

      <v-navigation-drawer color="surface" permanent>
        <v-sidebar />
      </v-navigation-drawer>

      <v-navigation-drawer color="surface" location="right">
        <v-list>
          <v-list-item title="Drawer right"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <router-view />
      </v-main>
    </v-layout>
  </v-card>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import VSidebar from '@/components/Sidebar/VSidebar.vue'

@Options({
  components: {
    VSidebar
  }
})

export default class App extends Vue {
}

</script>

<style lang="scss">
</style>
