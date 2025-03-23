<script lang="ts" setup>
  import { cn } from '@/utils/common'
  import { useAttrs, defineModel, defineEmits } from 'vue'
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
  }

  const props = defineProps<InputProps>()
  const attributes = useAttrs()

  const modelValue = defineModel<string>()
  const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div v-if="!props.hidden" class="space-y-1 w-full flex flex-col">
    <label v-if="props.label" class="font-semibold">{{ label }}</label>
    <input
      :value="modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      :class="
        cn(
          props.classname,
          props.error
            ? 'border-2 focus:ring-0 border-red-600'
            : 'border focus:ring-1 focus:ring-sky-400 focus:border-sky-400',
          'rounded-md h-8 outline-none px-2 disabled:bg-slate-100 disabled:border-slate-300 disabled:cursor-not-allowed'
        )
      "
      v-bind="attributes"
      :disabled="props.loading || props.disabled"
    />
    <p v-if="props.error" class="text-red-700 text-sm">{{ props.error }}</p>
    <p v-if="props.hint" class="text-gray-500 text-sm">hint : {{ props.hint }}</p>
  </div>
</template>
