import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],

  build: {
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('vue')) return 'vendor-vue'
          if (id.includes('vue-router')) return 'vendor-router'
          if (id.includes('vue-i18n')) return 'vendor-i18n'
        },
      },
    },
  },

  optimizeDeps: {
    include: [],
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  server: {
    preloadRequests: false,
    watch: { ignored: ['**/node_modules/**'] },
  },
})
