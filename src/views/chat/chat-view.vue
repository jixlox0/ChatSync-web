<script setup lang="ts">
  import { router } from '@/router'
  import { authStore } from '@/stores/auth-store'

  const auth = authStore()
  if (!auth.account || !auth.isAuthenticated) {
    router.push('/login')
  }
</script>

<template>
  <div class="flex justify-center items-center w-full">Chat page</div>
</template>
