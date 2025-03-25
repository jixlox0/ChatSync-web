import { getAccount } from '@/service/api'
import { Account } from '@/types/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'

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
        console.error(err)
        isAuthenticated.value = false
        loading.value = false
      })
  }

  return { account, isAuthenticated, loading, fetchAccount }
})
