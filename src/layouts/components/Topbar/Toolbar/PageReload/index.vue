<i18n lang="json">
{
  "zh-cn": {
    "tooltip1": "按住 {0} 键并点击",
    "tooltip2": "可切换为浏览器原生刷新"
  },
  "zh-tw": {
    "tooltip1": "按住 {0} 鍵並點擊",
    "tooltip2": "可切換為瀏覽器原生刷新"
  },
  "en": {
    "tooltip1": "Click while holding {0}",
    "tooltip2": "to switch to native browser refresh"
  }
}
</i18n>

<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings'
import hotkeys from 'hotkeys-js'
import { useI18n } from 'vue-i18n'

defineOptions({
  name: 'PageReload',
})

const settingsStore = useSettingsStore()
const { t } = useI18n()

const mainPage = useMainPage()

const isAnimating = ref(false)

onMounted(() => {
  hotkeys('f5', (e) => {
    e.preventDefault()
    mainPage.reload()
  })
})
onUnmounted(() => {
  hotkeys.unbind('f5')
})

function handleClick() {
  isAnimating.value = true
  mainPage.reload()
}

function handleCtrlClick() {
  location.reload()
}
</script>

<template>
  <FaTooltip side="bottom" :disabled="settingsStore.os === 'mac'">
    <template #content>
      <div class="flex-col-center gap-2">
        <i18n-t keypath="tooltip1" tag="p" class="flex-center gap-1">
          <FaKbd>Ctrl</FaKbd>
        </i18n-t>
        <p>{{ t('tooltip2') }}</p>
      </div>
    </template>
    <FaButton variant="ghost" size="icon" class="size-9" @click.exact="handleClick" @click.ctrl.exact="handleCtrlClick" @animationend="isAnimating = false">
      <FaIcon name="i-iconoir:refresh-double" class="size-4" :class="{ animation: isAnimating }" />
    </FaButton>
  </FaTooltip>
</template>

<style scoped>
.animation {
  animation: animation 1s;
}

@keyframes animation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
