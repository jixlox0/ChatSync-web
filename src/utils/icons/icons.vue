<script lang="ts" setup>
  import * as icons from 'lucide-vue-next'
  import { cn } from '../common'
  import { computed, useAttrs } from 'vue'
  import { IconNames } from '@/types/icons'

  interface IconProps {
    name: string
    classname?: string
    size?: number
  }

  const props = defineProps<IconProps>()
  let value = IconNames.find((icon) => icon.key === props.name).value
  const icon = computed(() => icons[value])

  const attributes = useAttrs()
  const style = `height: ${props.size}px; width: ${props.size}px;`
</script>

<template>
  <component
    :is="icon"
    v-bind="attributes"
    :style="style"
    :class="cn(props.name === 'spinner' ? 'animate-spin size-16' : props.classname)"
  />
</template>
