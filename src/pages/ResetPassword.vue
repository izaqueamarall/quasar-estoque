<template>
    <q-page class="row justify-center items-center">
        <q-card square bordered class="col-md-4 col-sm-5 col-xs-11 q-pa-sm shadow-4">
            <q-form class="row justify-center q-pt-md" @submit.prevent="handlePasswordReset">
                <p class="col-12 text-h4 text-center">Recuperar Senha</p>

                <div class="col-md-10 col-sm-9 col-xs-11 q-gutter-y-md">

                    <q-input
                    label="Nova Senha"
                    v-model="password"
                    lazy-rules
                    :rules="[val => (val && val.length >= 6) || 'Informe uma senha igual ou superior a 6 dígitos']"
                    type="password"
                    />

                    <div class="full-width q-pt-md q-gutter-y-sm">
                        <q-btn label="Enviar nova senha" color="primary" class="full-width" outline rounded
                            type="submit" />

                    </div>
                </div>
            </q-form>
        </q-card>
    </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import useAuthUser from 'src/composables/UseAuthUser'
import { useRoute, useRouter } from 'vue-router'
import useNotify from 'src/composables/UseNotify'

export default defineComponent({
  name: 'ResetPasswordPage',
  setup () {
    const { resetPassword } = useAuthUser()

    const { notifyError, notifySuccess } = useNotify()

    const route = useRoute()
    const router = useRouter()
    const token = route.query.token

    const password = ref('')

    const handlePasswordReset = async () => {
      try {
        await resetPassword(token, password.value)
        notifySuccess('Senha recuperada com sucesso!')
        router.push({ name: 'login' })
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      password,
      handlePasswordReset
    }
  }
})

</script>
