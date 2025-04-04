<script setup lang="ts">
  import { Button } from '@/components/ui/button'
  import { Icons } from '@/utils/icons'
  import { onMounted, ref, watch } from 'vue'

  const themes = ['light', 'dark'] // Add more themes if needed
  const currentTheme = ref('light')

  // Initialize theme from localStorage or system preference
  onMounted(() => {
    const savedTheme = localStorage.getItem('theme')
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    if (savedTheme) {
      currentTheme.value = savedTheme
    } else if (systemPrefersDark) {
      currentTheme.value = 'dark'
    }

    applyTheme()
  })

  // Apply the current theme to the document
  function applyTheme() {
    if (currentTheme.value === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Toggle between themes
  function toggleTheme() {
    currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
  }

  // Set a specific theme
  function setTheme(theme) {
    if (themes.includes(theme)) {
      currentTheme.value = theme
    }
  }

  // Watch for theme changes and persist to localStorage
  watch(currentTheme, (newTheme) => {
    localStorage.setItem('theme', newTheme)
    applyTheme()
  })
</script>

<template>
  <div class="absolute flex bottom-0.5 left-0.5 items-center justify-start z-50 w-full size-10">
    <Button class="size-10 rounded-bl-xl" @click="toggleTheme">
      <Icons style="height: 10px; width: 10px" :name="currentTheme === 'dark' ? 'moon' : 'sun'" />
    </Button>
  </div>
</template>
