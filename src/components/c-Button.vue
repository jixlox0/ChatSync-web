<script setup lang="ts">
  import { cn } from '@/utils/common'
  import Icons from '@/utils/icons.vue'
  import { cva } from 'class-variance-authority'

  import { defineProps, useAttrs } from 'vue'
  defineOptions({
    name: 'Button',
  })

  interface ButtonProps {
    classname?: string
    variant?: 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
    loading?: boolean
    type?: 'submit' | 'reset' | 'button'
    href?: string
    href_target?: string
    size?: 'sm' | 'lg' | 'icon'
  }

  const attributes = useAttrs()
  const props = defineProps<ButtonProps>()

  const buttonVariants = cva(
    'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-sky-400 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sky-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
    {
      variants: {
        variant: {
          default: 'bg-sky-400 text-white hover:bg-sky-400/90',
          destructive: 'bg-red-500 text-white hover:bg-red-500/90',
          outline: 'border hover:bg-slate-100',
          secondary: 'bg-gray-200 hover:bg-gray-200/80',
          ghost: 'hover:bg-gray-200 hover:text-gray-800',
          link: 'text-sky-400 underline-offset-4 hover:underline',
        },
        size: {
          default: 'h-10 px-4 py-2',
          sm: 'h-9 rounded-md px-3',
          lg: 'h-11 rounded-md px-8',
          icon: 'h-10 w-10',
        },
      },
      defaultVariants: {
        variant: 'default',
        size: 'default',
      },
    }
  )
</script>

<template>
  <button
    v-if="variant !== 'link'"
    :type="type"
    :class="
      cn(props.classname, buttonVariants({ variant, size }), props.loading && 'animate-pulse gap-2')
    "
    v-bind="attributes"
    v-on="attributes"
  >
    <slot /> <Icons v-if="props.loading" name="spinner" />
  </button>
  <router-link
    v-if="variant === 'link'"
    :to="props.href"
    :target="props.href_target"
    :class="
      cn(buttonVariants({ variant, size }), 'text-sky-400 px-0 underline-offset-4 hover:underline')
    "
  >
    <slot />
  </router-link>
</template>
