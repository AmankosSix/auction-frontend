<template>
  <v-table>
    <thead>
    <tr>
      <th class="text-left">
        Name
      </th>
      <th class="text-left">
        Email
      </th>
      <th class="text-left">
        Phone
      </th>
      <th class="text-left">
        Role
      </th>
      <th class="text-center">
        Options
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
      v-for="staff in list"
      :key="staff.uuid"
    >
      <td>{{ staff.name }}</td>
      <td>{{ staff.email }}</td>
      <td>{{ staff.phone }}</td>
      <td>{{ staff.role }}</td>
      <td>
        <div class="d-flex justify-center pa-2">
          <v-btn
            icon="mdi-pencil"
            color="blue-grey"
            class="mr-3"
          ></v-btn>
          <v-btn
            icon="mdi-trash-can"
            color="error"
          ></v-btn>
        </div>
      </td>
    </tr>
    </tbody>
  </v-table>
</template>

<script lang="ts" setup>
import { OwnerService } from '@/service/OwnerService'
import { onMounted, ref } from 'vue'

type Staff = {
  uuid: string,
  name: string,
  email: string,
  phone: string,
  role: string
}

const list = ref<Staff[]>([])

const oS = new OwnerService()

onMounted(async () => {
  const res = await oS.GetStaff<Staff[]>()

  if (!('errorCode' in res.response)) {
    list.value = res.response
  }
})
</script>
