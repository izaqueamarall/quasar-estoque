<template>
    <q-page class="row justify-center items-center">
    <q-card square bordered class="col-md-4 col-sm-5 col-xs-11 q-pa-sm shadow-4">
      <q-form class="row justify-center q-pt-md" @submit.prevent="handleForgotPassword">
          <p class="col-12 text-h4 text-center">Recuperar Senha</p>

          <div class="col-md-10 col-sm-9 col-xs-11 q-gutter-y-md">

            <q-input
            label="Email"
            v-model="email"
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

export default defineComponent({
  setup () {
    const { sendPasswordRestEmail } = useAuthUser()

    const email = ref('')

    const handleForgotPassword = async () => {
      await sendPasswordRestEmail(email.value)
      alert(`E-mail de redefinição de senha enviado para: ${email.value}`)
    }

    return {
      email,
      handleForgotPassword
    }
  }
})

</script>
