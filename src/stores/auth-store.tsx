import { router } from '@/router'
import { getAccount, logout } from '@/service/api'
import { Account } from '@/types/core'
import { authRoutes } from '@/types/routes'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { toast } from 'vue-sonner'

export const authStore = defineStore('auth', () => {
  const account = ref<Account>()
  const loading = ref<boolean>(false)
  const isAuthenticated = ref<boolean>(false)

  const fetchAccount = async () => {
    loading.value = true
    await getAccount()
      .then((res) => {
        account.value = res.data
        isAuthenticated.value = true
        loading.value = false
      })
      .catch((err) => {
        toast.error(err.error_message)
        isAuthenticated.value = false
        router.push(authRoutes.auth.login)
        loading.value = false
      })
    loading.value = false
  }

  const refresh = () => {
    const token = localStorage.getItem('token')
    if (token) {
      fetchAccount()
    } else {
      loading.value = false
    }
  }

  const logoutAccount = async () => {
    await logout().then(() => {
      account.value = null
      refresh()
      localStorage.removeItem('token')
    })
  }

  return { account, isAuthenticated, loading, refresh, logoutAccount }
})
