<template>
  <v-card>
    <v-layout class="h-screen">
      <v-app-bar color="blue-grey" class="justify-space-between">
        <v-toolbar-title>Auction Frontend</v-toolbar-title>

        <v-btn v-if="!mdAndUp" class="mx-4" icon="mdi-menu" @click="sidebar = !sidebar"></v-btn>
      </v-app-bar>

      <v-app-bar flat location="bottom" height="80">
        <v-footer class="d-flex flex-column px-0">
          <div class="bg-blue-grey-darken-1 d-flex w-100 align-center justify-center px-4">
            <strong class="d-none d-sm-flex">Get connected with me on social networks!</strong>

            <v-spacer class="d-none d-sm-flex"></v-spacer>

            <div class="d-flex">
              <v-btn
                v-for="icon in socialNetworkIcons"
                :key="icon"
                class="mx-4"
                :icon="icon"
                size="small"
              ></v-btn>
            </div>
          </div>

          <div class="px-4 py-2 bg-black text-center w-100">
             <strong>Aman's Pet Project</strong> 2023
          </div>
        </v-footer>
      </v-app-bar>

      <v-navigation-drawer v-model="sidebar" color="surface" :temporary="!mdAndUp" :permanent="!!mdAndUp">
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
import { defineAsyncComponent, ref } from 'vue'

import { useDisplay } from 'vuetify'

const VSidebar = defineAsyncComponent(
  () => import('@/components/Sidebar/VSidebar.vue')
)

const VNotify = defineAsyncComponent(
  () => import('@/components/VNotify/VNotify.vue')
)

const { mdAndUp } = useDisplay()

const sidebar = ref(false)

const socialNetworkIcons = [
  'mdi-linkedin',
  'mdi-github',
  'mdi-instagram'
]
</script>
