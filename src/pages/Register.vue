<template>
  <q-page class="row justify-center items-center">
    <q-card square bordered class="col-md-4 col-sm-5 col-xs-11 q-pa-sm shadow-4">
      <q-form class="row justify-center q-pt-md" @submit.prevent="handleRegister">
          <p class="col-12 text-h4 text-center">Registro</p>

          <div class="col-md-10 col-sm-9 col-xs-11 q-gutter-y-md">
            <q-input
            label="Name"
            v-model="form.name"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Informe seu nome']"
            />

            <q-input
            label="Email"
            v-model="form.email"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Informe seu e-mail']"
            type="email"
            />

            <q-input
            label="Password"
            v-model="form.password"
            lazy-rules
            :rules="[val => (val && val.length >= 6) || 'Informe uma senha igual ou superior a 6 dígitos']"
            type="password"
            />

            <div class="full-width q-pt-md q-gutter-y-sm">
              <q-btn
              label="Registrar"
              color="primary"
              class="full-width"
              outline
              rounded
              type="submit"
              />

              <q-btn
              label="Voltar"
              color="dark"
              class="full-width"
              rounded
              flat
              :to="{name: 'login'}"
              />
            </div>
          </div>
        </q-form>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import { useRouter } from 'vue-router'
import useNotify from 'src/composables/UseNotify'

export default defineComponent({
  name: 'RegisterPage',

  setup () {
    const router = useRouter()
    const { register } = useAuthUser()

    const { notifyError, notifySucess } = useNotify()

    const form = ref({
      name: '',
      email: '',
      password: ''
    })

    const handleRegister = async () => {
      try {
        await register(form.value)
        notifySucess()
        router.push({
          name: 'email-confirmation',
          query: { email: form.value.email }
        })
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      form,
      handleRegister
    }
  }
})
</script>
