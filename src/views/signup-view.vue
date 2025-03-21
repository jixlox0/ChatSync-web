<script setup>
  import Input from '@/components/c-Input.vue'
  import Button from '@/components/c-button.vue'
</script>

<template>
  <div class="flex justify-center items-center w-full">
    <form
      action=""
      class="p-4 flex justify-center items-center flex-col space-y-4 min-w-[40%] border rounded-xl"
    >
      <div class="text-3xl text-left font-bold">Welcome to ChatSync</div>
      <div class="text-xl text-left font-bold">Enter your valid details create a account.</div>
      <div class="space-y-4 pt-4">
        <div class="w-full flex gap-3">
          <Input classname="" label="First name" />
          <Input label="Last name" />
        </div>
        <Input @input="(value) => console.log(value.target.value)" label="User name" />
        <Input label="Email" />
        <Input type="password" label="Password" />
      </div>
      <Button type="button" loading="">Submit</Button>
    </form>
  </div>
</template>
