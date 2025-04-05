<script setup lang="ts">
  import { Button } from './ui/button'
  import { authStore } from '@/stores/auth-store'

  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from './ui/dropdown-menu'
  import { Icons } from '@/utils/icons'
  import { ThemeToggle } from './theme'
  const { logoutAccount } = authStore()
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Button variant="secondary" size="icon">
        <Icons name="settings" :size="16" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="space-y-1">
      <DropdownMenuItem class="p-0 gap-2">
        <Button class="w-full justify-start" variant="ghost" size="sm">
          <Icons name="user" :size="16" /> Profile
        </Button>
      </DropdownMenuItem>
      <DropdownMenuItem class="p-0">
        <ThemeToggle />
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem class="p-0 gap-2">
        <Button variant="destructive" @click="logoutAccount" class="w-full justify-start" size="sm">
          <Icons name="logout" :size="16" />
          Logout
        </Button>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
