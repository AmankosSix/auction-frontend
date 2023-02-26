<template>
  <v-container fluid class="bg-blue-grey-darken-1">
    <v-row align="center">
      <v-col cols="12" sm="6" class="text-sm-left text-center"><strong>Get connected with me on social networks!</strong></v-col>
      <v-col cols="12" sm="6" class="py-0">
        <div class="d-flex justify-sm-end justify-center">
          <v-btn
            v-for="icon in socialNetworkIcons"
            :key="icon"
            class="mx-4"
            :icon="icon"
            size="small"
            variant="plain"
          ></v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>

  <div class="px-4 py-2 bg-black text-center w-100">
    <strong>Aman's Pet Project</strong> 2023
  </div>
</template>

<script lang="ts" setup>
const socialNetworkIcons = [
  'mdi-linkedin',
  'mdi-github',
  'mdi-instagram'
]
</script>
