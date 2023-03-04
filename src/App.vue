<template>
  <v-app>
    <v-app>
      <v-app-bar color="blue-grey" class="justify-space-between">
        <v-header-app v-model="sidebar" />
      </v-app-bar>

      <v-footer app class="d-flex flex-column pa-0">
        <v-footer-app />
      </v-footer>

      <v-navigation-drawer app v-model="sidebar" color="surface" :temporary="!mdAndUp" :permanent="!!mdAndUp">
        <v-sidebar-app />
      </v-navigation-drawer>

<!--      <v-navigation-drawer color="surface" location="right">-->
<!--        <v-list>-->
<!--          <v-list-item title="For Future Features"></v-list-item>-->
<!--        </v-list>-->
<!--      </v-navigation-drawer>-->

      <v-main>
        <v-breadcrumbs-app />
        <router-view />
      </v-main>

      <v-notify />
    </v-app>
  </v-app>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, ref } from 'vue'
import { GetAllRoles, GetUserInfo } from '@/helpers/authInit'
import { useDisplay } from 'vuetify'

const VSidebarApp = defineAsyncComponent(
  () => import('@/components/App/SidebarApp.vue')
)

const VNotify = defineAsyncComponent(
  () => import('@/components/VNotify/VNotify.vue')
)

const VHeaderApp = defineAsyncComponent(
  () => import('@/components/App/HeaderApp.vue')
)

const VFooterApp = defineAsyncComponent(
  () => import('@/components/App/FooterApp.vue')
)

const VBreadcrumbsApp = defineAsyncComponent(
  () => import('@/components/App/BreadCrumbsApp.vue')
)

const { mdAndUp } = useDisplay()

const sidebar = ref(mdAndUp.value)

GetUserInfo()
GetAllRoles()

</script>
