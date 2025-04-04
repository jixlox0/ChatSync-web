<script setup lang="ts">
  import { WebSocketService } from '@/service/webSocketService'

  import { Button } from '@/components/ui/button'
  import { WebSocketUrl } from '@/utils/constants'
  import { onMounted, onUnmounted, ref } from 'vue'
  import { authStore } from '@/stores/auth-store'
  import { Chat } from '@/types/core'
  import { router } from '@/router'
  import { Textarea } from '@/components/ui/textarea'
  import { cn } from '@/utils/common'
  import ChatsListView from '../layout/chats-list-view.vue'

  const auth = authStore()
  const text = ref<string>('')
  const messages = ref<Chat[]>([])
  const websocketservice = new WebSocketService(WebSocketUrl)

  onMounted(() => {
    websocketservice.connect()

    websocketservice['socket'].onmessage = (event) => {
      messages.value.push(JSON.parse(event.data))
    }
  })

  onUnmounted(() => {
    websocketservice.close()
  })

  const sendMessage = () => {
    let message: Chat = {
      sender_id: auth.account.id,
      sender_user_name: auth.account.user_name,
      receiver_id: 'acc_d545f279c8fcf1f7fa59ff238c07d166',
      receiver_user_name: 'jixlox',
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
  <ChatsListView></ChatsListView>
  <div class="flex justify-center items-center w-full">
    <div class="flex size-full justify-end flex-col p-3">
      <div class="flex pb-2 overflow-hidden">
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
        <Textarea v-model="text" class="w-full resize-none" />
        <Button :disabled="text.length === 0" @click="sendMessage">Send</Button>
      </div>
    </div>
  </div>
</template>
