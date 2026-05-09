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
          v-for="(char, i) in mottoText"
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
const mottoText = computed(() => t('home.motto'))

// State
const scrollProgress = ref(0)
const typedText = ref('')
const hasTyped = ref(false)

// Cache elements ONCE (critical for performance)
let revealElements = []
let totalScrollHeight = 0

// Debounce function (limits scroll event frequency)
const debounce = (fn, delay = 16) => {
  let timeoutId
  return (...args) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), delay)
  }
}

// Typewriter (unchanged but optimized)
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

// Optimized scroll handler (batch reads/writes)
const handleScroll = debounce(() => {
  // 1. READ layout properties FIRST (single read)
  const scrollY = window.scrollY
  scrollProgress.value = Math.min(scrollY / totalScrollHeight, 1)
  const progress = scrollProgress.value

  // 2. WRITE styles in requestAnimationFrame (batched)
  requestAnimationFrame(() => {
    // Hero visibility
    const showHero = progress > 0.03
    heroStyles.value = {
      opacity: showHero ? 1 : 0,
      transform: `translate(-50%, -50%) scale(${showHero ? 1 : 0.8})`,
    }

    // Scroll indicator
    indicatorStyles.value = { opacity: progress < 0.06 ? 1 : 0 }

    // Bottom fade
    bottomStyles.value = {
      opacity: progress > 0.3 ? Math.min(1, (progress - 0.3) / 0.3) : 0,
    }

    // Reveal elements (cached)
    revealElements.forEach((el) => {
      const t = el.dataset.reveal
      let threshold = 0
      if (t === 'title') threshold = 0.05
      if (t === 'motto') threshold = 0.09
      if (t === 'desc') threshold = 0.13

      const isVisible = progress > threshold
      el.style.opacity = isVisible ? '1' : '0'
      el.style.transform = isVisible ? 'translateY(0)' : 'translateY(30px)'

      // Start typewriter only once
      if (t === 'title' && isVisible) startTypewriter()
    })
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
  // Cache elements ONCE
  revealElements = document.querySelectorAll('[data-reveal]')
  totalScrollHeight = document.body.scrollHeight - window.innerHeight

  // Add optimized scroll listener
  window.addEventListener('scroll', handleScroll)
  handleScroll() // Initial call
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
  /* ✅ THESE 2 LINES FIX IT */
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
