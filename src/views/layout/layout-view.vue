<script setup lang="ts">
  import { authStore } from '@/stores/auth-store'
  import ChatLayout from './chat-layout.vue'
  const auth = authStore()
</script>

<template>
  <title>Chats |ChatSync</title>
  <div class="p-10 flex grow size-full">
    <div
      class="border shadow-xl rounded-xl flex size-full overflow-hidden bg-gradient-to-r from-slate-100 to-slate-50"
    >
      <ChatLayout v-if="!auth.loading && auth.isAuthenticated">Chats</ChatLayout>
      <slot />
    </div>
  </div>
</template>
