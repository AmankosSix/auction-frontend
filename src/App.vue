<template>
  <v-app>
    <v-app>
      <v-app-bar color="blue-grey" class="justify-space-between">
        <v-header-app v-model="sidebar" />
      </v-app-bar>

      <v-navigation-drawer app v-model="sidebar" color="surface" :temporary="!mdAndUp" :permanent="!!mdAndUp">
        <v-sidebar-app />
        <template v-if="store.getters.isAuthenticated" v-slot:append>
          <div class="pa-2">
            <v-btn block @click="userLogout">
              Logout
            </v-btn>
          </div>
        </template>
      </v-navigation-drawer>

      <v-footer app class="d-flex flex-column pa-0">
        <v-footer-app />
      </v-footer>

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
import { defineAsyncComponent, onMounted, ref } from 'vue'
import { GetAllRoles, GetUserInfo, Logout } from '@/helpers/authInit'
import { useDisplay } from 'vuetify'
import '@/assets/scss/index.scss'
import { useRouter } from 'vue-router'
import { useStore } from '@/store'

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

const router = useRouter()
const store = useStore()

onMounted(async () => {
  await GetAllRoles()
  await GetUserInfo()
})

const userLogout = () => {
  Logout()
  router.push({ name: 'SignIn' })
}
</script>
