<template>
  <q-page class="flex flex-center text-h5">
    <div v-if="user">
      <p>Olá, {{ user.email }}</p>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'

export default defineComponent({
  name: 'MePage',

  setup () {
    const { user } = useAuthUser()

    return {
      user
    }
  }

})
</script>
