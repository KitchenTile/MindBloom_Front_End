// eslint.config.js
import { globalIgnores } from 'eslint/config'
import { defineConfig } from 'eslint'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

export default defineConfig(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{js,jsx,vue}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**']),

  pluginVue.configs['flat/essential'],
  skipFormatting,
)
