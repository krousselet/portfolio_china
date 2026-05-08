import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()], // REMOVED DEVTOOLS COMPLETELY

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

  // 🔥 THIS STOPS THE REQUEST CHAIN
  optimizeDeps: {
    include: [],
    esbuildOptions: {
      preload: false,
    },
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  // 🔥 DISABLE UNNECESSARY WATCHING
  server: {
    preloadRequests: false,
    watch: { ignored: ['**/node_modules/**'] },
  },
})
