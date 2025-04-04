<script setup lang="ts">
  import { WebSocketService } from '@/service/webSocketService'

  import { Button } from '@/components/ui/button'
  import { WebSocketUrl } from '@/utils/constants'
  import { onMounted, onUnmounted, ref } from 'vue'
  import { authStore } from '@/stores/auth-store'
  import { Account, Chat } from '@/types/core'
  import { router } from '@/router'
  import { Textarea } from '@/components/ui/textarea'
  import { cn } from '@/utils/common'
  import { ThemeToggle } from '@/components/theme'
  import { Icons } from '@/utils/icons'
  import { getAccounts } from '@/service/api'
  import { toast } from 'vue-sonner'

  const auth = authStore()
  const text = ref<string>('')
  const messages = ref<Chat[]>([])
  const accounts = ref<Account[]>([])
  const selectedAccount = ref<Account | null>(null)
  const websocketservice = new WebSocketService(WebSocketUrl)

  onMounted(async () => {
    if (auth.account) {
      websocketservice.connect()
    }

    websocketservice['socket'].onmessage = (event) => {
      messages.value.push(JSON.parse(event.data))
    }

    await getAccounts()
      .then((res) => {
        accounts.value = res.data
        selectedAccount.value = accounts.value[0]
      })
      .catch((err) => {
        toast('Error while fetching accounts:', err)
      })
  })

  onUnmounted(() => {
    websocketservice.close()
  })

  const sendMessage = () => {
    let message: Chat = {
      sender_id: auth.account.id,
      sender_user_name: auth.account.user_name,
      receiver_id: selectedAccount.value?.id,
      receiver_user_name: selectedAccount.value?.user_name,
      message: text.value,
      seen: false,
    }

    websocketservice.sendMessage(JSON.stringify(message))
    text.value = ''
  }

  if (!auth.account || !auth.isAuthenticated) {
    router.push('/login')
  }
</script>

<template>
  <div class="w-[40%] relative border-r">
    <div class="h-14 border-b flex items-center p-2">
      <h1 class="font-bold text-lg flex overflow-hidden">
        @
        <p class="hover:underline truncate">{{ auth && auth.account.user_name }}</p>
      </h1>
    </div>
    <div class="p-2">
      <div v-for="user in accounts">
        <div
          :key="user.id"
          @click="selectedAccount = user"
          :class="
            cn(
              selectedAccount && user.id === selectedAccount.id
                ? 'bg-accent  hover:bg-accent'
                : 'hover:bg-muted-foreground/20',
              'flex items-center gap-2 p-2 rounded-md cursor-pointer'
            )
          "
        >
          <div class="flex flex-col">
            <h1 class="font-bold text-sm truncate">{{ user.user_name }}</h1>
            <p class="text-xs text-gray-500 truncate">{{ user.email }}</p>
          </div>
        </div>
      </div>
    </div>
    <ThemeToggle />
  </div>
  <div class="flex justify-center items-center w-full">
    <div class="flex size-full flex-col p-3">
      <div class="flex pb-2 flex-col justify-between size-full overflow-hidden">
        <div class="border-b flex items-center p-2">
          <h1 class="font-bold text-lg flex overflow-hidden">
            <p class="hover:underline truncate">
              {{ selectedAccount && selectedAccount.user_name }}
            </p>
          </h1>
        </div>
        <div class="flex flex-col size-full overflow-auto">
          <div
            v-for="message in messages"
            :class="
              cn(
                auth.account.id === message.sender_id ? 'justify-end' : 'justify-start',
                'flex py-2'
              )
            "
          >
            <div
              class="border p-2 flex max-w-[80%] h-full break-words whitespace-normal rounded-lg"
            >
              {{ message.message }}
            </div>
          </div>
        </div>
      </div>
      <div class="flex gap-3 items-end">
        <Textarea v-model="text" class="w-full resize-none min-h-16" />
        <div class="flex items-center justify-center">
          <Button
            @click="sendMessage"
            class="size-12 flex justify-center rounded-full items-center"
            :disabled="text.length === 0"
          >
            <Icons name="send" style="height: 20px; width: 20px" classname="flex" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>
