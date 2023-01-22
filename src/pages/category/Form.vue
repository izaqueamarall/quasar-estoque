<template>
    <q-page padding>
        <div class="row justify-center">
            <div class="col-12 text-center">
                <p class="text-h6">Formulário Categoria</p>
            </div>
            <q-card square bordered class="col-md-5 col-sm-8 col-xs-12 q-pa-sm shadow-4">
                <q-form class="col-md-10 col-sm-9 col-xs-11 q-gutter-y-md" @submit.prevent="handleSubmit">

                    <q-input
                        label="Name"
                        v-model="form.name"
                        lazy-rules
                        :rules="[val => (val && val.length > 0) || 'Informe um nome para categoria']"
                    />

                    <q-btn
                        :label="isUpdated ? 'Atualizar' : 'Salvar'"
                        color="primary"
                        class="full-width"
                        rounded
                        type="submit"
                    />

                    <q-btn
                        label="Cancelar"
                        color="primary"
                        class="full-width"
                        rounded
                        flat
                        :to="{name: 'category'}"
              />
                </q-form>
            </q-card>
        </div>
    </q-page>
</template>

<script>
import { defineComponent, ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useApi from 'src/composables/UseApi'
import useNotify from 'src/composables/UseNotify'

export default defineComponent({
  name: 'FormPage',

  setup () {
    const table = 'category'
    const router = useRouter()
    const route = useRoute()
    const { post, getById, update } = useApi()
    const { notifyError, notifySuccess } = useNotify()

    const isUpdated = computed(() => route.params.id)

    let category = {}
    const form = ref({
      name: ''
    })

    onMounted(() => {
      if (isUpdated.value) {
        handleGetCategory(isUpdated.value)
      }
    })

    const handleSubmit = async () => {
      try {
        if (isUpdated.value) {
          await update(table, form.value)
          notifySuccess('Categoria atualizada!')
        } else {
          await post(table, form.value)
          notifySuccess('Nova categoria salva!')
        }
        router.push({ name: 'category' })
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleGetCategory = async (id) => {
      try {
        category = await getById(table, id)
        form.value = category
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      handleSubmit,
      form,
      isUpdated
    }
  }
})

</script>
