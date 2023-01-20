<template>
  <q-page class="row justify-center items-center">
    <q-card square bordered class="col-md-4 col-sm-5 col-xs-11 q-pa-sm shadow-4">
      <p class="text-h6">
      <q-form class="row justify-center q-pt-md" @submit.prevent="handleLogin">
        <p class="col-12 text-h4 text-center">Login</p>

        <div class="col-md-10 col-sm-9 col-xs-11 q-gutter-y-md">
          <q-input
          label="Email"
          v-model="form.email"
          />

          <q-input
          label="Password"
          v-model="form.password"
          />

          <div class="full-width q-pt-md">
            <q-btn
            label="Login"
            color="primary"
            class="full-width"
            outline
            rounded
            type="submit"
            />
          </div>

          <div class="full-width q-gutter-y-sm">
            <q-btn
            label="Registrar"
            color="primary"
            class="full-width"
            flat
            rounded
            to="/register"
            size="sm"
            />

            <q-btn
            label="Esqueceu a senha?"
            color="primary"
            class="full-width"
            flat
            rounded
            to="/forgot-password"
            size="sm"
            />
          </div>

        </div>
      </q-form>
    </p>
    </q-card>

  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import { useRouter } from 'vue-router'
export default defineComponent({
  name: 'LoginPage',

  setup () {
    const router = useRouter()

    const { login } = useAuthUser()

    const form = ref({
      email: '',
      password: ''
    })

    const handleLogin = async () => {
      try {
        await login(form.value)
        router.replace({ name: 'me' })
      } catch (error) {
        alert(error.message)
      }
    }

    return {
      form,
      handleLogin
    }
  }
})
</script>
