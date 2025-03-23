<script setup lang="ts">
  import Input from '@/components/c-Input.vue'
  import Button from '@/components/c-Button.vue'

  import { CreateAccounSchema } from '@/schemas/validation'
  import { useField, useForm } from 'vee-validate'
  import { toTypedSchema } from '@vee-validate/zod'

  import { createAccount } from '@/service/api'
  import { createAccountRequest } from '@/types/api'

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

    await createAccount(account)
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  })
</script>

<template>
  <div class="flex justify-center items-center w-full">
    <form
      @submit.prevent="onSubmit"
      class="px-4 py-6 flex justify-center items-center bg-white flex-col space-y-2 min-w-[40%] border rounded-xl"
    >
      <div class="text-3xl text-left font-bold">Welcome to ChatSync</div>
      <div class="text-md text-left font-light">Enter your valid details to create an account.</div>
      <div class="space-y-4 pt-4">
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
      <div class="flex justify-between w-full pt-2">
        <Button type="button" variant="link" href="/login">Have an account ?</Button>
        <Button :type="'submit'">Create</Button>
      </div>
    </form>
  </div>
</template>
