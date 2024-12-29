import type { UserConfig } from '@unocss/core'
import presetUno from '@unocss/preset-uno'
import presetIcons from '@unocss/preset-icons'

export default {
  presets: [presetUno(), presetIcons()]
} satisfies UserConfig
