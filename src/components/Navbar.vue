<template>
  <nav class="navbar">
    <div class="container">
      <div class="navbar-inner">
        <div class="logo">
          <!-- <img src="#" alt="" /> -->
        </div>

        <div class="nav-menu">
          <!-- ACTIVE CLASS AUTOMATICALLY APPLIED BY VUE ROUTER -->
          <router-link
            v-for="item in menu"
            :key="item.path"
            :to="item.path"
            @click="playClickSound"
            active-class="active-link"
          >
            {{ $t(item.label) }}
          </router-link>

          <select
            class="language-selector"
            @change="changeLang"
            v-model="currentLang"
            aria-label="Choose language"
          >
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="ru">Русский</option>
            <option value="zh">中文</option>
            <option value="ja">日本語</option>
            <option value="id">Indonesia</option>
            <option value="it">Italiano</option>
            <option value="es">Español</option>
          </select>

          <button @click="toggleDarkMode" class="toggle-btn">
            {{ isDark ? '☀️' : '🌙' }}
          </button>

          <button @click="toggleBackgroundMusic" class="toggle-btn">🎵</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useSounds } from '../composables/useSounds'
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { playClickSound, toggleBackgroundMusic } = useSounds()
const { locale } = useI18n()
const isDark = ref(false)
const currentLang = ref('en')

const menu = [
  { path: '/', label: 'nav.home' },
  { path: '/projects', label: 'nav.projects' },
  { path: '/about', label: 'nav.about' },
  { path: '/resume', label: 'nav.resume' },
  { path: '/contact', label: 'nav.contact' },
]

onMounted(() => {
  const saved = localStorage.getItem('lang') || 'en'
  locale.value = saved
  currentLang.value = saved

  if (localStorage.theme === 'dark') {
    document.documentElement.classList.add('dark-mode')
    isDark.value = true
  }
})

const changeLang = (e) => {
  const lang = e.target.value
  locale.value = lang
  currentLang.value = lang
  localStorage.setItem('lang', lang)
  playClickSound()
}

const toggleDarkMode = () => {
  playClickSound()
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark-mode')
    localStorage.theme = 'dark'
  } else {
    document.documentElement.classList.remove('dark-mode')
    localStorage.theme = 'light'
  }
}
</script>

<style scoped lang="scss">
$china-red: #c41e3a;
$china-gold: #d4af37;
$dark-bg: #0a0a0a;
$light-bg: #ffffff;

.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  padding: 1rem 0;
  transition: all 0.3s ease;

  :global(.dark-mode) & {
    background: rgba(10, 10, 10, 0.92);
  }
}

.navbar-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.6rem;

  h1 {
    font-weight: 700;
    color: $china-red;

    :global(.dark-mode) & {
      color: $china-gold;
    }
  }

  .logo-icon {
    color: $china-red;

    :global(.dark-mode) & {
      color: $china-gold;
    }
  }
}

.nav-menu {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;

  a {
    font-weight: 600;
    color: #222;
    text-decoration: none;
    transition: color 0.3s ease;
    position: relative;

    &:hover {
      color: $china-red;
    }

    :global(.dark-mode) & {
      color: #eee;

      &:hover {
        color: $china-gold;
      }
    }
  }

  // ACTIVE ROUTER LINK STYLING
  a.active-link {
    color: $china-red;
    font-weight: 700;

    &::after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 100%;
      height: 2px;
      background: $china-red;
      border-radius: 2px;
    }

    :global(.dark-mode) & {
      color: $china-gold;

      &::after {
        background: $china-gold;
      }
    }
  }
}

.toggle-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 8px;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  :global(.dark-mode) & {
    &:hover {
      background: rgba(255, 255, 255, 0.05);
    }
  }
}

/* ================================= */
/* LANGUAGE SELECTOR — CLEAN & FIXED */
/* ================================= */
.language-selector {
  padding: 0.5rem 0.8rem;
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 600;
  border: 1px solid rgba(196, 30, 58, 0.25);
  background: rgba(255, 255, 255, 0.5);
  color: $china-red;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: $china-red;
    background: rgba(196, 30, 58, 0.05);
  }

  /* Dark mode */
  :global(.dark-mode) & {
    background: rgba(26, 26, 26, 0.6);
    color: $china-gold;
    border-color: rgba(212, 175, 55, 0.35);

    &:hover {
      background: rgba(212, 175, 55, 0.08);
      border-color: $china-gold;
    }
  }
}

/* DROPDOWN OPTIONS — FINAL FIXED VERSION */
.language-selector option {
  background: #ffffff;
  color: #222;
}

:global(.dark-mode) .language-selector option {
  background: #1a1a1a !important;
  color: $china-gold !important;
}

/* ===================== */
/* 📱 RESPONSIVE */
/* ===================== */
@media (max-width: 480px) {
  .navbar-inner {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .nav-menu {
    gap: 0.7rem;
    a {
      font-size: 0.85rem;
    }
  }

  .language-selector {
    padding: 0.35rem 0.5rem;
    font-size: 0.8rem;
  }
}

@media (min-width: 481px) and (max-width: 768px) {
  .nav-menu {
    gap: 0.9rem;
  }
}

@media (min-width: 1200px) {
  .nav-menu {
    gap: 1.8rem;
  }
}
</style>
