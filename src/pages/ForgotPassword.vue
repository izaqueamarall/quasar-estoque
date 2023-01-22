<template>
    <q-page class="row justify-center items-center">
    <q-card square bordered class="col-md-4 col-sm-5 col-xs-11 q-pa-sm shadow-4">
      <q-form class="row justify-center q-pt-md" @submit.prevent="handleForgotPassword">
          <p class="col-12 text-h4 text-center">Recuperar Senha</p>

          <div class="col-md-10 col-sm-9 col-xs-11 q-gutter-y-md">

            <q-input
            label="Email"
            v-model="email"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Informe seu e-mail']"
            type="email"
            />

            <div class="full-width q-pt-md q-gutter-y-sm">
              <q-btn
              label="Enviar e-mail de redefinição"
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
import useNotify from 'src/composables/UseNotify'
import { useRouter } from 'vue-router'

export default defineComponent({
  setup () {
    const router = useRouter()

    const { sendPasswordRestEmail } = useAuthUser()

    const { notifyError, notifySuccess } = useNotify()

    const email = ref('')

    const handleForgotPassword = async () => {
      try {
        await sendPasswordRestEmail(email.value)
        notifySuccess(`E-mail de redefinição de senha enviado para: ${email.value}`)
        router.push({ name: 'login' })
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      email,
      handleForgotPassword
    }
  }
})

</script>
