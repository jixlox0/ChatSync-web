<script setup lang="ts"></script>

<template>
  <div class="md:p-10 p-5 flex grow size-full overflow-hidden">
    <div
      class="border shadow-xl rounded-xl flex size-full overflow-hidden bg-gradient-to-r from-slate-100 to-slate-50"
    >
      <slot />
    </div>
  </div>
</template>
