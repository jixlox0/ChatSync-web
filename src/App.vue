<script setup lang="ts">
  import { onMounted, watch } from 'vue'
  import { authStore } from './stores/auth-store'
  import LayoutView from './views/layout/layout-view.vue'
  import { PageLoader } from './components/loader'
  import { Toaster } from './components/ui/sonner'

  const auth = authStore()

  onMounted(async () => {
    await auth.fetchAccount()
  })

  watch(
    () => auth.account,
    () => {
      console.log('Account logged in successfully ☺️')
    }
  )
</script>

<template>
  <Toaster />
  <LayoutView>
    <router-view v-if="!auth.loading"></router-view>
    <PageLoader v-if="auth.loading" />
  </LayoutView>
</template>
