<script lang="ts" setup>
  import * as icons from 'lucide-vue-next'
  import { cn } from './common'
  import { computed } from 'vue'
  import { IconNames } from '@/types/icons'

  interface IconProps {
    name: string
    classname?: string
  }

  const props = defineProps<IconProps>()
  let value = IconNames.find((icon) => icon.key === props.name).value
  const icon = computed(() => icons[value])
</script>

<template>
  <component
    :is="icon"
    :class="cn(props.classname, props.name === 'spinner' && 'animate-spin', 'size-5')"
  />
</template>
