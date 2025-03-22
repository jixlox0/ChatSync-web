<script setup>
  import Input from '@/components/c-Input.vue'
  import Button from '@/components/c-Button.vue'
</script>

<template>
  <div class="flex justify-center items-center w-full">
    <form
      action=""
      class="px-4 py-6 flex justify-center items-center bg-white flex-col space-y-2 min-w-[40%] border rounded-xl"
    >
      <div class="text-3xl text-left font-bold">Welcome to ChatSync</div>
      <div class="text-md text-left font-light">Enter your valid details to create an account.</div>
      <div class="space-y-4 pt-4">
        <div class="w-full flex gap-3">
          <Input id="chatsync_first_name" classname="" label="First name" placeholder="Jon" />
          <Input id="chatsync_last_name" label="Last name" placeholder="Michale" />
        </div>
        <Input id="chatsync_user_name" label="User name" placeholder="@jonmich" />
        <Input id="chatsync_email" label="Email" placeholder="JonMichale@gmail.com" />
        <Input
          id="chatsync_password"
          type="password"
          label="Password"
          placeholder="i'm watching... oops sorry!"
        />
      </div>
      <div class="flex justify-between w-full pt-2">
        <Button type="button" variant="link" href="/login">Have an account ?</Button>
        <Button type="button">Create</Button>
      </div>
    </form>
  </div>
</template>
