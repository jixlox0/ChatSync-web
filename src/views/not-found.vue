<template>
  <div class="flex justify-center items-center w-full">
    <form
      action=""
      class="px-4 py-6 flex justify-center items-center bg-white flex-col space-y-4 min-w-[40%] border rounded-xl"
    >
      <div class="text-3xl text-left font-bold">Welcome to ChatSync</div>
      <div class="space-y-4 w-full max-w-sm pt-4">
        <Input id="chatsync_email" label="Email" placeholder="jonmichale@gmail.com" />
        <Input
          id="chatsync_password"
          type="password"
          label="Password"
          placeholder="i'm watching... just kidding!"
        />
      </div>
      <div class="flex justify-between w-full pt-2">
        <Button type="button" variant="link" href="/signup">Create an account ?</Button>
        <Button type="button">Signin</Button>
      </div>
    </form>
  </div>
</template>
