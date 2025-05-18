<i18n lang="json">
{
  "zh-cn": {
    "copied": "已复制"
  },
  "zh-tw": {
    "copied": "已複製"
  },
  "en": {
    "copied": "Copied"
  }
}
</i18n>

<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import useSettingsStore from '@/store/modules/settings'
import { cn } from '@/utils'
import { useClipboard } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  code: string
  class?: HTMLAttributes['class']
}>()

const settingsStore = useSettingsStore()

const { t } = useI18n()

const { copy, copied, isSupported } = useClipboard()
</script>

<template>
  <div
    :class="cn('group relative w-full rounded-lg bg-dark p-4 text-light', {
      'bg-dark': settingsStore.mode === 'mobile',
    }, props.class)"
  >
    <pre class="w-full overflow-auto whitespace-pre-line">
      <code class="whitespace-pre" tabindex="0">{{ code }}</code>
    </pre>
    <FaButton
      v-if="isSupported" variant="secondary" :class="cn('border border-light/20 px-2.5', {
        'absolute end-3 top-3 opacity-0 transition-opacity group-hover:opacity-100': settingsStore.mode === 'pc',
        'w-full mt-4': settingsStore.mode === 'mobile',
      })" @click="copy(code)"
    >
      {{ copied ? t('copied') : '' }}
      <FaIcon :name="copied ? 'i-tabler:clipboard-check' : 'i-tabler:clipboard'" class="size-4" />
    </FaButton>
  </div>
</template>

<style scoped>
@font-face {
  font-family: FontWithASyntaxHighlighter;
  src:
    url("FontWithASyntaxHighlighter-Regular.woff2")
    format("woff2");
}

code {
  font-family: FontWithASyntaxHighlighter, monospace;
}
</style>
