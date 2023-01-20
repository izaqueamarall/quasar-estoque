import { useQuasar } from 'quasar'
export default function useNotify () {
  const $q = useQuasar()

  const notifySucess = (message) => {
    $q.notify({
      type: 'positive',
      message: message || 'Deu tudo certo'
    })
  }

  const notifyError = (message) => {
    $q.notify({
      type: 'negative',
      message: message || 'Falhou'
    })
  }

  return {
    notifySucess,
    notifyError
  }
}
