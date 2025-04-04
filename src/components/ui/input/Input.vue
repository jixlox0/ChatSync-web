<script lang="ts" setup>
  import { cn } from '@/utils/common'
  import { Icons } from '@/utils/icons'
  import { useVModel } from '@vueuse/core'
  import { nextTick, ref, useAttrs } from 'vue'

  const props = defineProps({
    defaultValue: { type: [String, Number], required: false },
    modelValue: { type: [String, Number], required: false },
    class: { type: null, required: false },
    error: { type: String, required: false },
    hint: { type: String, required: false },
    label: { type: String, required: false },
    type: { type: String, required: false },
  })

  const attributes = useAttrs()
  let showPw = ref<boolean>(false)
  const inputRef = ref<HTMLInputElement | null>(null)

  const emits = defineEmits(['update:modelValue'])
  const modelValue = useVModel(props, 'modelValue', emits, {
    passive: true,
    defaultValue: props.defaultValue,
  })

  const togglePassword = () => {
    showPw.value = !showPw.value
    nextTick(() => {
      inputRef.value?.focus()
    })
  }
</script>

<template>
  <div class="space-y-1 w-full flex flex-col">
    <label v-if="props.label" class="font-semibold">{{ props.label }}</label>
    <div class="flex gap-2 w-full">
      <input
        ref="inputRef"
        :type="showPw && props.type === 'password' ? 'text' : props.type || 'text'"
        v-model="modelValue"
        v-bind="attributes"
        :class="
          cn(
            props.error && 'border-2 focus:ring-0 border-red-600',
            'h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            props.class
          )
        "
      />
      <button
        type="button"
        v-if="props.type === 'password'"
        @click="togglePassword"
        class="text-xs flex justify-center items-center"
      >
        <Icons v-if="showPw" name="eye" />
        <Icons v-if="!showPw" name="eyeClosed" />
      </button>
    </div>
    <p v-if="props.error" class="text-red-700 text-sm">{{ props.error }}</p>
    <p v-if="props.hint" class="text-gray-500 text-sm">hint : {{ props.hint }}</p>
  </div>
</template>
