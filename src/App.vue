<template>
  <v-card>
    <v-layout>
      <v-app-bar color="blue-grey" title="Auction Frontend"></v-app-bar>

      <v-app-bar flat location="bottom" height="80">
        <v-footer class="d-flex flex-column px-0">
          <div class="bg-blue-grey-darken-1 d-flex w-100 align-center px-4">
            <strong>Get connected with me on social networks!</strong>

            <v-spacer></v-spacer>

            <v-btn
              v-for="icon in socialNetworkIcons"
              :key="icon"
              class="mx-4"
              :icon="icon"
              size="small"
            ></v-btn>
          </div>

          <div class="px-4 py-2 bg-black text-center w-100">
             <strong>Aman's Pet Project</strong> 2023
          </div>
        </v-footer>
      </v-app-bar>

      <v-navigation-drawer color="surface" permanent>
        <v-sidebar />
      </v-navigation-drawer>

      <v-navigation-drawer color="surface" location="right">
        <v-list>
          <v-list-item title="For Future Features"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <router-view />
      </v-main>

      <v-notify />
    </v-layout>
  </v-card>
</template>

<script lang="ts" setup>
import { defineAsyncComponent } from 'vue'

const VSidebar = defineAsyncComponent(
  () => import('@/components/Sidebar/VSidebar.vue')
)

const VNotify = defineAsyncComponent(
  () => import('@/components/VNotify/VNotify.vue')
)

const socialNetworkIcons = [
  'mdi-linkedin',
  'mdi-github',
  'mdi-instagram'
]
</script>
