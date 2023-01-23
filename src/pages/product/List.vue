<template>
    <q-page padding>
        <div class="row">
            <div class="col-12">
                <q-table :rows="products" :columns="columnsProduct" row-key="id" :loading="loading">
                    <template v-slot:top>
                        <span class="text-h6">Produtos</span>
                        <q-space />
                        <q-btn v-if="$q.platform.is.desktop" label="Adicionar Novo" color="primary" icon="mdi-plus" dense :to="{name: 'form-product'}" />
                    </template>
                    <template v-slot:body-cell-img_url="props">
                      <q-td :props="props">
                        <q-avatar v-if="props.row.img_url">
                          <img :src="props.row.img_url">
                        </q-avatar>
                        <q-avatar v-else color="grey" text-color="white" icon="mdi-image-off" />
                      </q-td>
                     </template>
                    <template v-slot:body-cell-actions="props">
                        <q-td :props="props" class="q-gutter-x-sm">
                            <q-btn icon="mdi-pencil-outline" color="info" dense size="sm" @click="handleEdit(props.row)">
                                <q-tooltip>EDITAR</q-tooltip>
                            </q-btn>
                            <q-btn icon="mdi-delete-outline" color="negative" dense size="sm" @click="handleRemoveProduct(props.row)">
                                <q-tooltip>DELETAR</q-tooltip>
                            </q-btn>
                        </q-td>
                    </template>

                </q-table>
            </div>
        </div>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn fab icon="mdi-plus" color="primary" :to="{name: 'form-product'}" v-if="$q.platform.is.mobile"/>
        </q-page-sticky>
    </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import useApi from 'src/composables/UseApi'
import useNotify from 'src/composables/UseNotify'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { columnsProduct } from './table'

export default defineComponent({
  name: 'ProductListPage',

  setup () {
    const products = ref([])
    const loading = ref(true)
    const { list, remove } = useApi()
    const { notifyError, notifySuccess } = useNotify()
    const router = useRouter()
    const $q = useQuasar()
    const table = 'product'

    const handleListProducts = async () => {
      try {
        loading.value = true
        products.value = await list(table)
        loading.value = false
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleEdit = (product) => {
      router.push({ name: 'form-product', params: { id: product.id } })
    }

    const handleRemoveProduct = async (product) => {
      try {
        $q.dialog({
          title: 'Deletar',
          message: `Voce deseja deletar ${product.name} ?`,
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await remove(table, product.id)
          notifySuccess('Produto deletado')
          handleListProducts()
        })
      } catch (error) {
        notifyError(error.message)
      }
    }

    onMounted(() => {
      handleListProducts()
    })

    return {
      columnsProduct,
      products,
      loading,
      handleEdit,
      handleRemoveProduct
    }
  }

})
</script>
