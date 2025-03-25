<script setup lang="ts">
  import Input from '@/components/c-Input.vue'
  import Button from '@/components/c-Button.vue'
  import { useField, useForm } from 'vee-validate'
  import { toTypedSchema } from '@vee-validate/zod'
  import { LoginAccountSchema } from '@/schemas/validation'
  import { loginAccountRequest } from '@/types/api'
  import { loginAccount } from '@/service/api'
  import { authStore } from '@/stores/auth-store'
  import { router } from '@/router'
  import { ref } from 'vue'

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
        auth.fetchAccount()
        loading.value = false
      })
      .catch((err) => {})
  })

  if (auth.account || auth.isAuthenticated) {
    router.push('/')
  } else {
    router.push('/login')
  }
</script>

<template>
  <div class="flex justify-center items-center w-full">
    <form
      @submit.prevent="onSubmit"
      class="px-4 py-6 flex justify-center items-center bg-white flex-col space-y-4 min-w-[40%] border rounded-xl"
    >
      <div class="text-3xl text-left font-bold">Welcome to ChatSync {{}}</div>
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
          placeholder="i'm watching... just kidding!"
          :error="errors.password"
        />
      </div>
      <div class="flex justify-between w-full pt-1">
        <Button type="button" variant="link" href="/signup">Create an account ?</Button>
        <Button type="submit" :loading="loading">Signin</Button>
      </div>
    </form>
  </div>
</template>
