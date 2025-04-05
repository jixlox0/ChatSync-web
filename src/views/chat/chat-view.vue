<script setup lang="ts">
  import { WebSocketService } from '@/service/webSocketService'

  import { Button } from '@/components/ui/button'
  import { WebSocketUrl } from '@/utils/constants'
  import { onMounted, onUnmounted, ref } from 'vue'
  import { authStore } from '@/stores/auth-store'
  import { Account, Chat, ChatMessage } from '@/types/core'

  import { Textarea } from '@/components/ui/textarea'
  import { cn } from '@/utils/common'
  import { ThemeToggle } from '@/components/theme'
  import { Icons } from '@/utils/icons'
  import { getAccounts, getChatPartners, syncChatPartner } from '@/service/api'
  import { toast } from 'vue-sonner'
  import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
  import { CreateSyncRequest } from '@/types/api'
  import Settings from '@/components/settings.vue'
  import { router } from '@/router'
  import { authRoutes } from '@/types/routes'

  const auth = authStore()
  const text = ref<string>('')
  const partners = ref<Chat[]>([])
  const selectedpartner = ref<Chat>()
  const accounts = ref<Account[]>([])
  const messages = ref<ChatMessage[]>([])
  const selectedTab = ref<string>('chats')
  const websocketservice = new WebSocketService(WebSocketUrl)

  const handleMakeConnection = () => {
    websocketservice.connect()
    websocketservice['socket'].onmessage = (event) => {
      messages.value.push(JSON.parse(event.data))
    }
  }

  const handleSyncChat = async (partnerid: string) => {
    if (auth.account && partnerid) {
      let input: CreateSyncRequest = {
        sender_user_id: auth.account.id,
        receiver_user_id: partnerid,
      }

      await syncChatPartner(input).then(() => {
        toast.info('Sync successed.')
      })
    }
  }

  const sendMessage = () => {
    let message: ChatMessage = {
      sender_id: auth.account.id,
      sender_user_name: auth.account.user_name,
      receiver_id: selectedpartner.value?.receiver_user_id,
      receiver_user_name: 'asd',
      message: text.value,
      seen: false,
    }

    websocketservice.sendMessage(JSON.stringify(message))
    text.value = ''
  }

  onMounted(async () => {
    if (!auth.account) return
    await getAccounts()
      .then((res) => {
        accounts.value = res.data.filter((ac) => ac.id !== auth.account.id)
      })
      .catch((err) => {
        toast('Error while fetching accounts:', err)
      })

    await getChatPartners()
      .then((res) => {
        partners.value = res.data
      })
      .catch((err) => {
        toast('Error while fetching partners:', err)
      })
  })

  onUnmounted(() => {
    websocketservice.close()
  })

  if (!auth.account || !auth.isAuthenticated) {
    router.push(authRoutes.auth.login)
  }
</script>

<template>
  <div class="w-[40%] relative border-r">
    <div class="h-14 border-b flex justify-between items-center p-2">
      <h1 class="font-bold text-lg flex overflow-hidden">
        @
        <p class="hover:underline truncate">{{ auth.account && auth.account.user_name }}</p>
      </h1>
      <Settings />
    </div>
    <Tabs
      class="p-2 overflow-hidden"
      :default-value="selectedTab"
      v-model:model-value="selectedTab"
    >
      <TabsList class="">
        <TabsTrigger value="chats" @click="selectedTab = 'chats'">Chats</TabsTrigger>
        <TabsTrigger value="new_chat" @click="selectedTab = 'new_chat'">NewChat</TabsTrigger>
      </TabsList>
      <TabsContent value="chats" class="overflow-hidden">
        <div v-for="partner in partners">
          <div
            :key="`${partner.id}`"
            @click="
              () => {
                selectedpartner = partner
                handleMakeConnection()
              }
            "
            :class="
              cn(
                selectedpartner && partner.id === selectedpartner.id
                  ? 'bg-accent  hover:bg-accent'
                  : 'hover:bg-muted-foreground/20',
                'flex items-center gap-2 p-2 justify-between rounded-md cursor-pointer'
              )
            "
          >
            <div class="flex space-y-1 flex-col truncate">
              <!-- <h1 class="font-bold text-md truncate">{{ partner.first_name }} {{ partner.last_name }}</h1> -->
              <h1 class="font-bold text-xs text-muted-foreground truncate">
                @{{ partner.receiver_user_id }}
              </h1>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="new_chat">
        <div v-for="user in accounts">
          <div
            :key="`chatsync-account-${user.id}`"
            :class="
              cn(
                'flex items-center gap-2 p-2 justify-between rounded-md cursor-pointer hover:bg-muted-foreground/20'
              )
            "
          >
            <div class="flex space-y-1 flex-col">
              <h1 class="font-bold text-md truncate">{{ user.first_name }} {{ user.last_name }}</h1>
              <h1 class="font-bold text-xs text-muted-foreground truncate">
                @{{ user.user_name }}
              </h1>
            </div>
            <div>
              <Button size="sm" @click="handleSyncChat(user.id)">Sync</Button>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  </div>
  <div class="flex justify-center items-center w-full">
    <div v-if="selectedpartner" class="flex size-full flex-col p-3">
      <div class="flex pb-2 flex-col justify-between size-full overflow-hidden">
        <div class="border-b flex items-center p-2">
          <h1 class="font-bold text-lg flex overflow-hidden">
            <p class="hover:underline truncate">{{ selectedpartner && selectedpartner.id }}</p>
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
            <Icons name="send" :size="20" classname="flex" />
          </Button>
        </div>
      </div>
    </div>
    <div v-else class="flex justify-center items-center">
      <p class="text-2xl">No partner selected in this moment</p>
    </div>
  </div>
</template>
