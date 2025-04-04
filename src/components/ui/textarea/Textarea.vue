<script setup>
  import { cn } from '@/utils/common'
  import { useVModel } from '@vueuse/core'

  const props = defineProps({
    class: { type: null, required: false },
    defaultValue: { type: [String, Number], required: false },
    modelValue: { type: [String, Number], required: false },
    hidden: { type: Boolean, required: false },
    disabled: { type: Boolean, required: false },
    loading: { type: Boolean, required: false },
    error: { type: String, required: false },
    hint: { type: String, required: false },
    label: { type: String, required: false },
  })

  const emits = defineEmits(['update:modelValue'])

  const modelValue = useVModel(props, 'modelValue', emits, {
    passive: true,
    defaultValue: props.defaultValue,
  })
</script>

<template>
  <div v-if="!props.hidden" class="space-y-1 w-full flex flex-col">
    <textarea
      v-model="modelValue"
      :class="
        cn(
          props.error && 'border-2 focus:ring-0 border-red-600',
          'flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          props.class
        )
      "
    />
    <p v-if="props.error" class="text-red-700 text-sm">{{ props.error }}</p>
    <p v-if="props.hint" class="text-gray-500 text-sm">hint : {{ props.hint }}</p>
  </div>
</template>
