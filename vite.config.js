import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 🔥 DEVTOOLS ONLY IN DEVELOPMENT (DISABLE IN PROD)
    // vueDevTools() // REMOVE THIS FOR PROD / PERFORMANCE
  ],

  // SPLIT CODE FOR MAX SPEED
  build: {
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'vue-i18n'],
        },
      },
    },
    // MINIFY + BUST CACHE + REDUCE SIZE
    minify: 'terser',
    cssCodeSplit: true,
  },

  // PREVENT LONG REQUEST CHAINS
  optimizeDeps: {
    include: ['vue', 'vue-router', 'vue-i18n'],
    // 🔥 DISABLE UNNECESSARY PRELOADS
    esbuildOptions: {
      preload: false,
    },
  },

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  // ✅ PREVENT UNNECESSARY FILE WATCHING
  server: {
    watch: {
      ignored: ['**/node_modules/**', '**/dist/**'],
    },
  },
})
