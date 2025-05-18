<script setup lang="ts">
import Panel from './panel.vue'

defineOptions({
  name: 'Favorites',
})

const open = ref(false)
</script>

<template>
  <FaPopover v-model:open="open" class="p-0">
    <FaButton variant="ghost" size="icon" class="size-9">
      <FaIcon name="i-uiw:star-off" class="size-4" />
    </FaButton>
    <template #panel>
      <Panel @on-choose="open = false" />
    </template>
  </FaPopover>
</template>
