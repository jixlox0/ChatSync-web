<script setup lang="ts"></script>

<template>
  <title>Chats |ChatSync</title>
  <div class="p-10 flex grow size-full overflow-hidden">
    <div
      class="border shadow-xl rounded-xl flex size-full overflow-hidden bg-gradient-to-r from-slate-100 to-slate-50"
    >
      <slot />
    </div>
  </div>
</template>
