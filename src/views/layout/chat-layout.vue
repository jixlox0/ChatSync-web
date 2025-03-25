<script setup lang="ts">
  import { authStore } from '@/stores/auth-store'
  const auth = authStore()
</script>

<template>
  <div class="w-[40%] border-r">
    <div class="h-14 border-b flex items-center p-2">
      <h1 class="font-bold text-lg flex overflow-hidden">
        @
        <p class="hover:underline truncate">{{ auth.account.user_name }}</p>
      </h1>
    </div>
    <div class="p-2">
      <slot />
    </div>
  </div>
</template>
