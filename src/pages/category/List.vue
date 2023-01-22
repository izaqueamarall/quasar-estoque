<template>
    <q-page padding>
        <div class="row">
            <div class="col-12">
                <q-table :rows="categories" :columns="columns" row-key="id" :loading="loading">
                    <template v-slot:top>
                        <span class="text-h6">Categoria</span>
                        <q-space />
                        <q-btn v-if="$q.platform.is.desktop" label="Adicionar Novo" color="primary" icon="mdi-plus" dense :to="{name: 'form-category'}" />
                    </template>
                    <template v-slot:body-cell-actions="props">
                        <q-td :props="props" class="q-gutter-x-sm">
                            <q-btn icon="mdi-pencil-outline" color="info" dense size="sm" @click="handleEdit(props.row)">
                                <q-tooltip>EDITAR</q-tooltip>
                            </q-btn>
                            <q-btn icon="mdi-delete-outline" color="negative" dense size="sm" @click="handleRemoveCategory(props.row)">
                                <q-tooltip>DELETAR</q-tooltip>
                            </q-btn>
                        </q-td>
                    </template>

                </q-table>
            </div>
        </div>
        <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn fab icon="mdi-plus" color="primary" :to="{name: 'form-category'}" v-if="$q.platform.is.mobile"/>
        </q-page-sticky>
    </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import useApi from 'src/composables/UseApi'
import useNotify from 'src/composables/UseNotify'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const columns = [
  { name: 'name', align: 'left', label: 'Nome', field: 'name', sortable: true },
  { name: 'actions', align: 'right', label: 'Ações', field: 'actions', sortable: true }
]

export default defineComponent({
  name: 'CategoryListPage',

  setup () {
    const categories = ref([])
    const loading = ref(true)
    const { list, remove } = useApi()
    const { notifyError, notifySuccess } = useNotify()
    const router = useRouter()
    const $q = useQuasar()
    const table = 'category'

    const handleListCategories = async () => {
      try {
        loading.value = true
        categories.value = await list(table)
        loading.value = false
      } catch (error) {
        notifyError(error.message)
      }
    }

    const handleEdit = (category) => {
      router.push({ name: 'form-category', params: { id: category.id } })
    }

    const handleRemoveCategory = async (category) => {
      try {
        $q.dialog({
          title: 'Deletar',
          message: `Voce deseja deletar ${category.name} ?`,
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await remove(table, category.id)
          notifySuccess('Categoria deletada')
          handleListCategories()
        })
      } catch (error) {
        notifyError(error.message)
      }
    }

    onMounted(() => {
      handleListCategories()
    })

    return {
      columns,
      categories,
      loading,
      handleEdit,
      handleRemoveCategory
    }
  }

})
</script>
