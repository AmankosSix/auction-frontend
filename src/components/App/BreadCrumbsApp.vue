<template>
  <v-breadcrumbs :items="state.bc" class="bg-blue-grey-lighten-2">
    <template v-slot:title="{ item }">
      {{ item.text }}
    </template>
  </v-breadcrumbs>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { watch, reactive } from 'vue'

const route = useRoute()

interface Breadcrumb {
  path: string,
  to: string,
  text: string | unknown
}

const crumbs: Breadcrumb[] = []

const state = reactive({ bc: crumbs })

// watch(() => route.name, SetCrumbs)
watch(() => route.name, () => SetCrumbs())

function SetCrumbs () {
  const pathArray = route.path.split('/')
  pathArray.shift()
  state.bc = pathArray.reduce((bcArr: Breadcrumb[], path: string, idx: number) => {
    bcArr.push({
      path: path,
      to: bcArr[idx - 1]
        ? '/' + bcArr[idx - 1].path + '/' + path
        : '/' + path,
      text: route.matched[idx]?.meta?.breadCrumb || path
    })
    return bcArr
  }, [])
}
</script>
