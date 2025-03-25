<script lang="ts" setup>
  import { cn } from '@/utils/common'
  import Icons from '@/utils/icons.vue'
  import { useAttrs, defineModel, defineEmits, ref, nextTick } from 'vue'

  defineOptions({
    name: 'Input',
  })

  interface InputProps {
    label?: string
    loading?: boolean
    hidden?: boolean
    disabled?: boolean
    classname?: string
    error?: string
    hint?: string
    type?: string
  }
  const attributes = useAttrs()
  const props = defineProps<InputProps>()

  const modelValue = defineModel<string>()
  const inputRef = ref<HTMLInputElement | null>(null)
  let showPw = ref<boolean>(false)

  const emit = defineEmits(['update:modelValue'])

  const togglePassword = () => {
    showPw.value = !showPw.value
    nextTick(() => {
      inputRef.value?.focus()
    })
  }
</script>

<template>
  <div v-if="!props.hidden" class="space-y-1 w-full flex flex-col">
    <label v-if="props.label" class="font-semibold">{{ props.label }}</label>
    <div class="flex gap-2 w-full">
      <input
        ref="inputRef"
        :type="showPw && props.type === 'password' ? 'text' : props.type || 'text'"
        :value="modelValue"
        @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        :class="
          cn(
            props.classname,
            props.error
              ? 'border-2 focus:ring-0 border-red-600'
              : 'border focus:ring-1 focus:ring-sky-400 focus:border-sky-400',
            'rounded-md h-8 w-full flex outline-none px-2 disabled:bg-slate-100 disabled:border-slate-300 disabled:cursor-not-allowed'
          )
        "
        v-bind="attributes"
        :disabled="props.loading || props.disabled"
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
