<template>
  <div>
    <Navbar />
    <main>
      <!-- ROUTER WITH APP-WIDE WASH TRANSITION -->
      <router-view v-slot="{ Component }">
        <transition name="page-wash" mode="out-in">
          <component :is="Component" :key="$route.fullPath" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
</script>

<style lang="scss">
//  LIGHT MODE (DEFAULT)
html,
body,
p,
h1 {
  margin: 0;
  padding: 0;
  background-color: #ffffff !important;
  color: #0a0a0a !important;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

// DARK MODE
html.dark-mode,
html.dark-mode body,
html.dark-mode p,
html.dark-mode h1 {
  background-color: #0a0a0a !important;
  color: #ffffff !important;
}

html.dark-mode * {
  color: #ffffff !important;
  background-color: transparent !important;
}

html.dark-mode .card,
html.dark-mode input,
html.dark-mode textarea,
html.dark-mode .skill-tag,
html.dark-mode .resume-sidebar {
  background: #1a1a1a !important;
  color: white !important;
}

html.dark-mode .section-title,
html.dark-mode .highlight,
html.dark-mode .tech,
html.dark-mode .date {
  color: #d4af37 !important;
}

// GLOBAL APP-WIDE PAGE WASH TRANSITION (router-based)
.page-wash-enter-active,
.page-wash-leave-active {
  transition: all 0.15s cubic-bezier(0.25, 1, 0.5, 1);
}

.page-wash-enter-from {
  opacity: 0;
  transform: translateY(50px) scale(0.95);
  filter: blur(6px);
}

.page-wash-leave-to {
  opacity: 0;
  transform: translateY(-40px) scale(0.95);
  filter: blur(5px);
}

/* Main content padding so it doesn't go under navbar */
main {
  padding-top: 70px;
  min-height: calc(100vh - 70px);
}
</style>
