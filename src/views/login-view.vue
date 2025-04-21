<script setup lang="ts">
  import { Input } from '@/components/ui/input'
  import { Button } from '@/components/ui/button'
  import { useField, useForm } from 'vee-validate'
  import { toTypedSchema } from '@vee-validate/zod'

  import { LoginAccountSchema } from '@/schemas/validation'
  import { loginAccountRequest } from '@/types/api'
  import { loginAccount } from '@/service/api'
  import { authStore } from '@/stores/auth-store'
  import { router } from '@/router'
  import { ref } from 'vue'
  import { toast } from 'vue-sonner'
  import { baseRoutes } from '@/types/routes'

  const auth = authStore()
  const loading = ref<boolean>(false)

  const { errors, handleSubmit } = useForm({
    validationSchema: toTypedSchema(LoginAccountSchema),
  })

  const { value: email } = useField<string>('email')
  const { value: password } = useField<string>('password')

  const onSubmit = handleSubmit(async (data) => {
    let account: loginAccountRequest = {
      email: data.email,
      password: data.password,
    }

    loading.value = true
    await loginAccount(account)
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
      class="px-4 py-6 flex justify-center items-center flex-col space-y-4 min-w-[40%] border rounded-xl"
    >
      <div class="text-3xl text-left font-bold">Welcome to ChatSync</div>
      <div class="space-y-4 w-full max-w-sm pt-4">
        <Input
          v-model="email"
          autocomplete="email"
          id="chatsync_email"
          label="Email"
          placeholder="jonmichale@gmail.com"
          :error="errors.email"
        />
        <Input
          v-model="password"
          id="chatsync_password"
          autocomplete="current-password"
          type="password"
          label="Password"
          placeholder="********"
          :error="errors.password"
        />
      </div>
      <div class="flex flex-col w-full max-w-sm space-y-3 justify-center items-center pt-1">
        <Button class="w-full" type="submit" :loading="loading" :disabled="loading">Login</Button>
        <p class="text-sm text-gray-500">
          Don't have an account?
          <router-link to="/auth/signup" class="text-sky-600 hover:underline">
            Register
          </router-link>
        </p>
      </div>
    </form>
  </div>
</template>
