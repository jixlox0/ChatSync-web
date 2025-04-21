<script setup lang="ts">
  import { Input } from '@/components/ui/input'
  import { Button } from '@/components/ui/button'

  import { CreateAccounSchema } from '@/schemas/validation'
  import { useField, useForm } from 'vee-validate'
  import { toTypedSchema } from '@vee-validate/zod'

  import { createAccount } from '@/service/api'
  import { createAccountRequest } from '@/types/api'
  import { authStore } from '@/stores/auth-store'
  import { router } from '@/router'
  import { ref } from 'vue'
  import { toast } from 'vue-sonner'
  import { baseRoutes } from '@/types/routes'

  const auth = authStore()
  const loading = ref<boolean>(false)

  const { errors, handleSubmit } = useForm({
    validationSchema: toTypedSchema(CreateAccounSchema),
  })

  const { value: first_name } = useField<string>('first_name')
  const { value: last_name } = useField<string>('last_name')
  const { value: user_name } = useField<string>('user_name')
  const { value: email } = useField<string>('email')
  const { value: password } = useField<string>('password')

  const onSubmit = handleSubmit(async (data) => {
    let account: createAccountRequest = {
      first_name: data.first_name,
      last_name: data.last_name,
      user_name: data.user_name,
      email: data.email,
      password: data.password,
    }

    loading.value = true
    await createAccount(account)
      .then((res) => {
        auth.refresh()
        loading.value = false
      })
      .catch((err) => {
        toast.error(err.error_message)
        loading.value = false
      })
  })

  if (auth.account || auth.isAuthenticated) {
    router.push(baseRoutes.root)
  }
</script>

<template>
  <div class="flex justify-center items-center w-full">
    <form
      @submit.prevent="onSubmit"
      class="px-4 py-6 flex justify-center items-center flex-col space-y-2 min-w-[40%] border rounded-xl"
    >
      <div class="text-3xl text-left font-bold">Create your account here</div>
      <div class="text-md text-left font-light">Enter your valid details to create an account.</div>
      <div class="space-y-4 pt-4 max-w-sm">
        <div class="w-full flex gap-3">
          <Input
            v-model="first_name"
            autocomplete="first_name"
            id="chatsync_first_name"
            label="First name"
            placeholder="Jon"
            :error="errors.first_name"
          />
          <Input
            v-model="last_name"
            id="chatsync_last_name"
            autocomplete="last_name"
            label="Last name"
            placeholder="Michale"
            :error="errors.last_name"
          />
        </div>
        <Input
          v-model="user_name"
          id="chatsync_user_name"
          label="Username"
          autocomplete="user_name"
          placeholder="@jonmich"
          :error="errors.user_name"
        />
        <Input
          v-model="email"
          id="chatsync_email"
          label="Email"
          autocomplete="email"
          placeholder="JonMichale@gmail.com"
          :error="errors.email"
        />
        <Input
          v-model="password"
          id="chatsync_password"
          type="password"
          autocomplete="current-password"
          label="Password"
          placeholder="i'm watching... just kidding!"
          :error="errors.password"
        />
      </div>
      <div class="flex flex-col w-full space-y-3 max-w-sm justify-center items-center pt-2">
        <Button class="w-full" type="submit" :loading="loading">Create</Button>
        <p class="text-sm text-gray-500">
          Already have an account?
          <router-link to="/auth/login" class="text-sky-600 hover:underline">Login</router-link>
        </p>
      </div>
    </form>
  </div>
</template>
