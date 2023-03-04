<template>
  <v-list nav>
    <template v-for="nav in navItems" :key="nav.path">
      <v-list-group
        v-if="'children' in nav"
        :value="nav.title"
      >
        <template v-slot:activator="{ props }">
          <v-list-item
            v-if="!nav.hide"
            v-bind="props"
            :title="nav.title"
            :prepend-icon="nav.icon"
          ></v-list-item>
        </template>

        <template v-for="{title, icon, path, hide, event} in nav.children" :key="path">
          <v-list-item
            v-if="hide && event"
            :title="title"
            :prepend-icon="icon"
            :value="title"
            @click="event"
          ></v-list-item>
          <v-list-item
            v-else-if="hide"
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
import { computed } from 'vue'
import { useStore } from '@/store'
import { Logout } from '@/helpers/authInit'
import { useRouter } from 'vue-router'

interface Navigation {
  title: string,
  icon?: string,
  path?: string,
  hide?: boolean
  event?: () => void,
  children?: Navigation[]
}

const store = useStore()
const router = useRouter()

const userLogout = () => {
  Logout()
  router.push({ name: 'SignIn' })
}

const navItems = computed<Navigation[]>(() => ([
  {
    title: 'Home',
    icon: 'mdi-home',
    path: '/'
  },
  {
    title: store.getters.user?.name || 'Account',
    icon: 'mdi-account',
    path: '/account',
    children: [
      {
        title: 'Profile',
        icon: 'mdi-badge-account',
        path: '',
        hide: store.getters.isAuthenticated
      },
      {
        title: 'Sign In',
        icon: 'mdi-login',
        path: '/sign-in',
        hide: !store.getters.isAuthenticated
      },
      {
        title: 'Sign Up',
        icon: 'mdi-account-plus-outline',
        path: '/sign-up',
        hide: !store.getters.isAuthenticated
      },
      {
        title: 'Log out',
        icon: 'mdi-logout',
        event: userLogout,
        hide: store.getters.isAuthenticated
      }
    ]
  },
  {
    title: 'Owner',
    icon: 'mdi-account-tie',
    path: '/owner',
    hide: !store.getters.isOwner,
    children: [
      {
        title: 'List',
        icon: 'mdi-account-group',
        path: '',
        hide: store.getters.isAuthenticated
      },
      {
        title: 'New Staff',
        icon: 'mdi-account-plus-outline',
        path: '/register',
        hide: store.getters.isAuthenticated
      }
    ]
  }
]))
</script>
