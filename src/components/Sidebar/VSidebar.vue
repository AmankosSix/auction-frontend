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

        <v-list-item
          v-for="{title, icon, path} in nav.children"
          :key="path"
          :title="title"
          :prepend-icon="icon"
          :value="title"
          :to="`${nav.path}${path}`"
        ></v-list-item>
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
// import { ref } from 'vue'

const navItems = [
  {
    title: 'Home',
    icon: 'mdi-home',
    path: '/'
  },
  {
    title: 'Auth',
    icon: 'mdi-account',
    path: '/auth',
    children: [
      {
        title: 'Sign In',
        icon: 'mdi-login',
        path: '/sign-in'
      },
      {
        title: 'Sign Up',
        icon: 'mdi-account-plus-outline',
        path: '/sign-up'
      }
    ]
  }
]

</script>
