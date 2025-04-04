<script setup lang="ts">
  import { authStore } from '@/stores/auth-store'
</script>

<template>
  <div class="md:p-10 p-5 flex grow size-full overflow-hidden">
    <div class="border shadow-xl rounded-xl flex size-full overflow-hidden">
      <slot />
    </div>
  </div>
</template>
