import type { RecursiveRequired, Settings } from '#/global'
import { cloneDeep } from 'es-toolkit'
import settingsDefault from '@/settings.default'
import { merge } from '@/utils/object'

const globalSettings: Settings.all = {
  app: {
    enableDynamicTitle: true
  },
  home: {
    enable: false
  },
  menu: {
    enableHotkeys: true
  },
  toolbar: {
    i18n: true,
    fullscreen: true,
    pageReload: true,
    colorScheme: true,
    layout: [
      "favorites",
      "breadcrumb",
      "->",
      "notification",
      "navSearch",
      "i18n",
      "fullscreen",
      "pageReload",
      "colorScheme"
    ]
  }
}
export default merge(globalSettings, cloneDeep(settingsDefault)) as RecursiveRequired<Settings.all>
