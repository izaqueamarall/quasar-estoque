<template>
    <q-page padding>
        <div class="row">
            <div class="col-12">
                <q-table :rows="categories" :columns="columns" row-key="id" :loading="loading">
                    <template v-slot:top>
                        <span class="text-h6">Categoria</span>
                        <q-space />
                        <q-btn label="Adicionar Novo" color="primary" dense />
                    </template>
                    <template v-slot:body-cell-actions="props">
                        <q-td :props="props" class="q-gutter-x-sm">
                            <q-btn icon="mdi-pencil-outline" color="info" dense size="sm">
                                <q-tooltip>EDITAR</q-tooltip>
                            </q-btn>
                            <q-btn icon="mdi-delete-outline" color="negative" dense size="sm">
                                <q-tooltip>DELETAR</q-tooltip>
                            </q-btn>
                        </q-td>
                    </template>

                </q-table>
            </div>
        </div>
    </q-page>
</template>

<script>

const columns = [
  { name: 'name', align: 'left', label: 'Nome', field: 'names', sortable: true },
  { name: 'actions', align: 'right', label: 'Ações', field: 'actions', sortable: true }
]

import { defineComponent, ref, onMounted } from 'vue'
import useApi from 'src/composables/UseApi'
import useNotify from 'src/composables/UseNotify'
export default defineComponent({
  name: 'CategoryListPage',

  setup () {
    const categories = ref([])
    const loading = ref(true)
    const { list } = useApi()
    const { notifyError } = useNotify()

    const handleListCategories = async () => {
      try {
        loading.value = true
        categories.value = await list('category')
        loading.value = false
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
      loading
    }
  }

})
</script>