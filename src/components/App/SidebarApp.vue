<template>
  <v-list nav>
    <template v-for="nav in navItems" :key="nav.path">
      <v-list-group
        v-if="'children' in nav"
        :value="nav.title"
      >
        <template v-slot:activator="{ props }">
          <v-list-item
            v-bind="props"
            :title="nav.title"
            :prepend-icon="nav.icon"
          ></v-list-item>
        </template>

        <template v-for="{title, icon, path, hide} in nav.children" :key="path">
          <v-list-item
            v-if="hide"
            :title="title"
            :prepend-icon="icon"
            :value="title"
            :to="`${nav.path}${path}`"
          ></v-list-item>
        </template>
      </v-list-group>
      <v-list-item
        v-else
        :prepend-icon="nav.icon"
        :title="nav.title"
        :value="nav.path"
        :to="nav.path"
      ></v-list-item>
    </template>
  </v-list>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue'
import { useStore } from '@/store'
import { Logout } from '@/helpers/authInit'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const user = computed(() => store.getters.user).value
const isAuthenticated = computed(() => store.getters.isAuthenticated).value

const userLogout = () => {
  router.push({ name: 'SignIn' })
  Logout()
}

const navItems = reactive([
  {
    title: 'Home',
    icon: 'mdi-home',
    path: '/'
  },
  {
    title: user?.name || 'Auth',
    icon: 'mdi-account',
    path: '/auth',
    children: [
      {
        title: 'Sign In',
        icon: 'mdi-login',
        path: '/sign-in',
        hide: !isAuthenticated
      },
      {
        title: 'Sign Up',
        icon: 'mdi-account-plus-outline',
        path: '/sign-up',
        hide: !isAuthenticated
      },
      {
        title: 'Profile',
        icon: 'mdi-badge-account',
        path: '/sign-up',
        hide: isAuthenticated
      },
      {
        title: 'Log out',
        icon: 'mdi-logout',
        path: '',
        event: userLogout,
        hide: isAuthenticated
      }
    ]
  }
])
</script>
