<script setup lang="ts">
  import { onMounted, watch } from 'vue'
  import { authStore } from './stores/auth-store'
  import LayoutView from './views/layout/layout-view.vue'
  import Loading from './views/loading.vue'

  const auth = authStore()

  onMounted(async () => {
    await auth.fetchAccount()
  })

  watch(
    () => auth.account,
    () => {
      console.log('Account logged in successfully ☺️', auth.account)
    }
  )
</script>

<template>
  <LayoutView>
    <router-view v-if="!auth.loading"></router-view>
    <Loading v-if="auth.loading" />
  </LayoutView>
</template>
