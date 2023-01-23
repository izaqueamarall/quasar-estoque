<template>
    <q-page padding>
        <div class="row justify-center">
            <div class="col-12 text-center">
                <p class="text-h6">Formulário de Produtos</p>
            </div>
            <q-card square bordered class="col-md-5 col-sm-8 col-xs-12 q-pa-sm shadow-4">
                <q-form class="col-md-10 col-sm-9 col-xs-11 q-gutter-y-md" @submit.prevent="handleSubmit">

                    <q-input
                    label="Imagem do produto"
                    stack-label
                    v-model="img"
                    type="file"
                    accept="image/*"
                    />

                    <q-input
                        label="Nome"
                        v-model="form.name"
                        lazy-rules
                        :rules="[val => (val && val.length > 0) || 'Informe um nome para o produto']"
                    />

                    <q-editor
                      v-model="form.description"
                      min-height="5rem"
                    />

                    <q-input
                        label="Quantidade em Estoque"
                        v-model="form.amount"
                        lazy-rules
                        :rules="[val =>  !!val || 'Informe a quantida de produto em estoque']"
                        type="number"
                    />

                    <q-input
                        label="Preço R$"
                        v-model="form.price"
                        lazy-rules
                        :rules="[val =>  !!val || 'Informe o valor do produto']"
                        prefix="R$"
                    />

                    <q-select
                      v-model="form.category_id"
                      :options="optionsCategory"
                      label="Categoria"
                      option-value="id"
                      option-label="name"
                      map-options
                      emit-value
                      lazy-rules
                        :rules="[val =>  !!val || 'Informe a categoria do produto']"

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
                        :to="{name: 'product'}"
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
    const table = 'product'
    const router = useRouter()
    const route = useRoute()
    const { post, getById, update, list, uploadImg } = useApi()
    const { notifyError, notifySuccess } = useNotify()

    const isUpdated = computed(() => route.params.id)

    let product = {}
    const optionsCategory = ref([])
    const form = ref({
      name: '',
      description: '',
      amount: 0,
      price: 0,
      category_id: '',
      img_url: ''
    })

    const img = ref([])

    onMounted(() => {
      handleListCategories()
      if (isUpdated.value) {
        handleGetProduct(isUpdated.value)
      }
    })

    const handleListCategories = async () => {
      optionsCategory.value = await list('category')
    }

    const handleSubmit = async () => {
      try {
        if (img.value.length > 0) {
          const imgUrl = await uploadImg(img.value[0], 'products')
          form.value.img_url = imgUrl
        }
        if (isUpdated.value) {
          await update(table, form.value)
          notifySuccess('Produto atualizado!')
        } else {
          await post(table, form.value)
          notifySuccess('Nova produto salvo!')
        }
        router.push({ name: 'product' })
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleGetProduct = async (id) => {
      try {
        product = await getById(table, id)
        form.value = product
      } catch (error) {
        notifyError(error.message)
      }
    }

    return {
      handleSubmit,
      form,
      isUpdated,
      optionsCategory,
      img
    }
  }
})

</script>
