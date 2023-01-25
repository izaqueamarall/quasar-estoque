<template>
  <q-page class="row justify-center items-center">
    <q-card square bordered class="col-md-4 col-sm-5 col-xs-11 q-pa-sm shadow-4">
      <p class="text-h6">
      <q-form class="row justify-center q-pt-md" @submit.prevent="handleLogin">
        <p class="col-12 text-h4 text-center">Login</p>

        <div class="col-md-10 col-sm-9 col-xs-11 q-gutter-y-md">
          <q-input
          label="E-mail"
          v-model="form.email"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Por favor informe seu e-mail']"
          type="email"
          />

          <q-input
          label="Senha"
          v-model="form.password"
          lazy-rules
          :rules="[val => (val && val.length > 0) || 'Por favor informe sua senha']"
          type="password"
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
import { defineComponent, ref, onMounted } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import { useRouter } from 'vue-router'
import useNotify from 'src/composables/UseNotify'
import { useQuasar } from 'quasar'
export default defineComponent({
  name: 'LoginPage',

  setup () {
    const router = useRouter()

    const { login, isLoggedIn } = useAuthUser()

    const $q = useQuasar()

    const { notifyError } = useNotify()

    const form = ref({
      email: '',
      password: ''
    })

    onMounted(() => {
      if (isLoggedIn) {
        router.push({ name: 'me' })
      }
    })

    const handleLogin = async () => {
      try {
        $q.loading.show({ })
        await login(form.value)
        $q.loading.hide()

        // notifySuccess('Login realizado com sucesso!')
        router.replace({ name: 'me' })
      } catch (error) {
        $q.loading.hide()
        notifyError(error.message)
        // alert(error.message)
      }
    }

    return {
      form,
      handleLogin
    }
  }
})
</script>
