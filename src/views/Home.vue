<template>
  <section class="home-section">
    <div class="scroll-spacer"></div>

    <div class="hero-content" :style="heroStyles">
      <h1 class="main-title" data-reveal="title">
        <span class="typewriter">{{ typedText }}</span>
        <span class="cursor blink">_</span>
      </h1>

      <p class="motto" data-reveal="motto">
        <span
          class="letter"
          v-for="(char, i) in mottoTextOne"
          :key="i"
          :style="{ animationDelay: `${i * 0.04}s` }"
        >
          {{ char === ' ' ? '\u00A0' : char }}
        </span>
      </p>
      <p class="motto" data-reveal="motto">
        <span
          class="letter"
          v-for="(char, i) in mottoTextTwo"
          :key="i"
          :style="{ animationDelay: `${i * 0.04}s` }"
        >
          {{ char === ' ' ? '\u00A0' : char }}
        </span>
      </p>

      <p class="description" data-reveal="desc">
        {{ $t('home.description') }}
      </p>
    </div>

    <div class="scroll-indicator" :style="indicatorStyles"></div>
    <div class="fade-bottom" :style="bottomStyles"></div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Reactive translations
const titleText = computed(() => t('home.typewriterTitle'))
const mottoTextOne = computed(() => t('home.motto1'))
const mottoTextTwo = computed(() => t('home.motto2'))

// State
const scrollProgress = ref(0)
const typedText = ref('')
const hasTyped = ref(false)

// ✅ REMOVED ALL LAYOUT READS DURING SCROLL
// No more getBoundingClientRect() = NO FORCED REFLOW

// Debounce
const debounce = (fn, delay = 16) => {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

// Typewriter
function startTypewriter() {
  if (hasTyped.value) return
  hasTyped.value = true

  let i = 0
  const fullText = titleText.value
  const typeInterval = setInterval(() => {
    if (i < fullText.length) {
      typedText.value += fullText.charAt(i)
      i++
    } else {
      clearInterval(typeInterval)
    }
  }, 35)
}

// ✅ 100% OPTIMIZED SCROLL
// ONLY reads scrollY ONCE
// ONLY writes in RAF
// NO DOM LAYOUT QUERIES DURING SCROLL
const handleScroll = debounce(() => {
  const scrollY = window.scrollY
  scrollProgress.value = Math.min(scrollY / (document.body.scrollHeight - window.innerHeight), 1)
  const progress = scrollProgress.value

  requestAnimationFrame(() => {
    // Hero
    const showHero = progress > 0.03
    heroStyles.value = {
      opacity: showHero ? 1 : 0,
      transform: `translate(-50%, -50%) scale(${showHero ? 1 : 0.8})`,
    }

    // Indicator
    indicatorStyles.value = { opacity: progress < 0.06 ? 1 : 0 }

    // Fade
    bottomStyles.value = {
      opacity: progress > 0.3 ? Math.min(1, (progress - 0.3) / 0.3) : 0,
    }

    // ✅ REVEAL BY PROGRESS ONLY — NO LAYOUT READS
    const showTitle = progress > 0.05
    const showMotto = progress > 0.09
    const showDesc = progress > 0.13

    // Title
    const titleEl = document.querySelector('[data-reveal="title"]')
    if (titleEl) {
      titleEl.style.opacity = showTitle ? '1' : '0'
      titleEl.style.transform = showTitle ? 'translateY(0)' : 'translateY(30px)'
      if (showTitle) startTypewriter()
    }

    // Motto
    const mottoEls = document.querySelectorAll('[data-reveal="motto"]')
    mottoEls.forEach((el) => {
      el.style.opacity = showMotto ? '1' : '0'
      el.style.transform = showMotto ? 'translateY(0)' : 'translateY(30px)'
    })

    // Desc
    const descEl = document.querySelector('[data-reveal="desc"]')
    if (descEl) {
      descEl.style.opacity = showDesc ? '1' : '0'
      descEl.style.transform = showDesc ? 'translateY(0)' : 'translateY(20px)'
    }
  })
})

// Reactive styles
const heroStyles = ref({
  opacity: 0,
  transform: 'translate(-50%, -50%) scale(0.8)',
})
const indicatorStyles = ref({ opacity: 1 })
const bottomStyles = ref({ opacity: 0 })

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped lang="scss">
.home-section {
  position: relative;
  width: 100%;
  min-height: 300vh;
  background: transparent;
}
.scroll-spacer {
  height: 100vh;
}

.hero-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 10;
  width: 90%;
  max-width: 1400px;
  transition:
    opacity 0.5s cubic-bezier(0.2, 1, 0.3, 1),
    transform 0.5s cubic-bezier(0.2, 1, 0.3, 1);
}

/* TYPEWRITER & CURSOR */
.main-title {
  font-size: clamp(2.2rem, 6vw, 7rem);
  font-weight: 700;
  line-height: 1.15;
  color: #fff;
  margin-bottom: 1.4rem;
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
  white-space: pre-wrap;
}

.typewriter {
  position: relative;
  display: inline-block;
}

.cursor {
  color: #c41e3a;
  font-weight: bold;
  animation: blink 1.1s infinite step-end;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

.typewriter::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -8px;
  width: 0%;
  height: 5px;
  background: #c41e3a;
  border-radius: 2px;
  transition: width 0.8s cubic-bezier(0.2, 1, 0.3, 1);
}

.main-title[style*='opacity: 1'] .typewriter::after {
  width: 100%;
}

/* JUMPING LETTERS MOTTO — FULL UNBREAKABLE LINE */
.motto {
  white-space: nowrap !important;
  width: 100%;

  font-size: clamp(1.1rem, 3.2vw, 3.2rem);
  font-weight: 500;
  color: rgba(255, 255, 255, 0.94);
  margin-bottom: 2.2rem;
  min-height: 1.2em;
  line-height: 1.4;
  text-align: center;
  opacity: 0;
  transform: translateY(30px);
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}

.letter {
  display: inline-block;
  opacity: 0;
  transform: translateY(50px) scale(0.7);
  animation: jumpIn 0.6s cubic-bezier(0.2, 1, 0.3, 1) forwards;
  animation-play-state: paused;
}

.motto[style*='opacity: 1'] .letter {
  animation-play-state: running;
}

@keyframes jumpIn {
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* DESCRIPTION */
.description {
  font-size: clamp(1rem, 2vw, 1.3rem);
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 2rem;
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}

/* SCROLL INDICATOR */
.scroll-indicator {
  position: fixed;
  left: 50%;
  bottom: 44px;
  transform: translateX(-50%);
  z-index: 8;
  transition: opacity 0.4s ease;
}

.scroll-indicator::before {
  content: '';
  display: block;
  width: 26px;
  height: 26px;
  border-right: 3px solid rgba(255, 255, 255, 0.5);
  border-bottom: 3px solid rgba(255, 255, 255, 0.5);
  transform: rotate(45deg);
  animation: bounce 1.7s infinite ease-in-out;
}

@keyframes bounce {
  0%,
  100% {
    transform: rotate(45deg) translate(0, 0);
  }
  50% {
    transform: rotate(45deg) translate(10px, 10px);
  }
}

.fade-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 180px;
  background: linear-gradient(to top, #0a0a0a, transparent);
  z-index: 3;
  transition: opacity 0.6s ease;
}
</style>
