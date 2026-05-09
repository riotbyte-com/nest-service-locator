import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['tests/**/*.spec.ts'],
    setupFiles: ['tests/setup.ts'],
  },
  plugins: [swc.vite()],
})
