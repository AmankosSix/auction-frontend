<template>
  <v-list nav>
    <template v-for="nav in navItems" :key="nav.path">
      <v-list-group v-if="'children' in nav">
        <template v-slot:activator="{ props }">
          <v-list-item
            v-if="!nav.hide"
            v-bind="props"
            :title="nav.title"
            :prepend-icon="nav.icon"
            active-color="blue-grey"
          ></v-list-item>
        </template>

        <template v-for="{title, icon, path, hide} in nav.children" :key="path">
          <v-list-item
            v-if="!hide"
            :title="title"
            :prepend-icon="icon"
            :to="{ name: path }"
          ></v-list-item>
        </template>
      </v-list-group>
      <v-list-item
        v-else
        :prepend-icon="nav.icon"
        :title="nav.title"
        :to="{ name: nav.path }"
        active-color="blue-grey"
      ></v-list-item>
    </template>
  </v-list>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from '@/store'

interface Navigation {
  title: string,
  icon?: string,
  path?: string,
  hide?: boolean
  children?: Navigation[]
}

const store = useStore()

const navItems = computed<Navigation[]>(() => ([
  {
    title: 'Home',
    icon: 'mdi-home',
    path: 'HomeComponent'
  },
  {
    title: store.getters.user?.name || 'Account',
    icon: 'mdi-account',
    children: [
      {
        title: 'Profile',
        icon: 'mdi-badge-account',
        path: 'UserProfile',
        hide: !store.getters.isAuthenticated
      },
      {
        title: 'Sign In',
        icon: 'mdi-login',
        path: 'SignIn',
        hide: store.getters.isAuthenticated
      },
      {
        title: 'Sign Up',
        icon: 'mdi-account-plus-outline',
        path: 'SignUp',
        hide: store.getters.isAuthenticated
      }
    ]
  },
  {
    title: 'Owner',
    icon: 'mdi-account-tie',
    hide: !store.getters.isOwner,
    children: [
      {
        title: 'List',
        icon: 'mdi-account-group',
        path: 'StaffList',
        hide: !store.getters.isOwner
      },
      {
        title: 'New Staff',
        icon: 'mdi-account-plus-outline',
        path: 'StaffRegister',
        hide: !store.getters.isOwner
      }
    ]
  }
]))
</script>
