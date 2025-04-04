<script setup lang="ts">
  import { cn } from '@/utils/common'
  import { Primitive } from 'reka-ui'
  import { buttonVariants } from '.'
  import { Icons } from '@/utils/icons'
  import { useAttrs } from 'vue'

  const props = defineProps({
    variant: { type: null, required: false },
    size: { type: null, required: false },
    class: { type: null, required: false },
    asChild: { type: Boolean, required: false },
    as: { type: null, required: false, default: 'button' },
    loading: { type: Boolean, required: false },
    type: { type: String, required: false, default: 'button' },
    href: { type: String, required: false },
    href_target: { type: String, required: false },
  })

  const attributes = useAttrs()
</script>

<template>
  <Primitive
    v-if="props.variant !== 'link'"
    v-bind="attributes"
    v-on="attributes"
    :type="props.type"
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)"
  >
    <slot /> <Icons name="spinner" v-if="props.loading" />
  </Primitive>
  <router-link
    v-else
    :to="props.href"
    :target="props.href_target"
    :class="cn(buttonVariants({ variant, size }), props.class)"
  >
    <slot /> <Icons name="loading" v-if="props.loading" />
  </router-link>
</template>
