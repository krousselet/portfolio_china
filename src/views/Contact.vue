<template>
  <section class="contact-section">
    <div class="container max-w-6xl mx-auto">
      <!-- Title -->
      <div class="text-center mb-12" data-reveal>
        <h2 class="section-title jumbo-title jump-text no-cursor">{{ $t('contact.title') }}</h2>
        <p class="sub-title tremble-text no-cursor" data-stagger>
          {{ $t('contact.subtitle') }}
        </p>
      </div>

      <!-- Contact Grid -->
      <div class="contact-grid">
        <!-- Form -->
        <div class="form-card" data-reveal>
          <form @submit.prevent="sendForm" class="contact-form">
            <div class="input-group" data-stagger>
              <label>{{ $t('contact.name') }}</label>
              <input
                v-model="form.name"
                type="text"
                required
                class="input"
                :class="{ invalid: form.name && form.name.length < 2 }"
              />
            </div>

            <div class="input-group" data-stagger>
              <label>{{ $t('contact.email') }}</label>
              <input
                v-model="form.email"
                type="email"
                required
                class="input"
                :class="{ invalid: form.email && !isEmailValid }"
              />
            </div>

            <div class="input-group" data-stagger>
              <label>{{ $t('contact.message') }}</label>
              <textarea
                v-model="form.message"
                required
                rows="5"
                class="input"
                :class="{ invalid: form.message && form.message.length < 5 }"
              ></textarea>
            </div>

            <button
              type="submit"
              class="btn-hover"
              :disabled="loading"
              @click="playClickSound"
              data-stagger
            >
              {{ loading ? $t('contact.sending') : $t('contact.send') }}
            </button>
          </form>
        </div>
      </div>
    </div>

    <!-- ✨ SUCCESS ANIMATION POPUP + AUTO MODE DRAGON -->
    <div class="success-animation" :class="{ show: showSuccess }">
      <img
        v-if="!isDarkMode"
        src="/images/dragon_black.png"
        alt="Dragon Light Mode"
        class="dragon-img"
        loading="lazy"
      />
      <img
        v-if="isDarkMode"
        src="/images/dragon_white.png"
        alt="Dragon Dark Mode"
        class="dragon-img"
        loading="lazy"
      />
      <span class="success-text">{{ $t('contact.successText') }}</span>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted, computed, onBeforeUnmount } from 'vue'
import { useSounds } from '../composables/useSounds'

// SOUND
const { playFire, playClick } = useSounds()

const playClickSound = () => {
  playClick()
}

// Data
const form = reactive({
  name: '',
  email: '',
  message: '',
})

const loading = ref(false)
const showSuccess = ref(false)
const isDarkMode = ref(false)

// Email Validation
const isEmailValid = computed(() => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(form.email)
})

// DARK MODE DETECTION
onMounted(() => {
  const checkDarkMode = () => {
    isDarkMode.value = document.documentElement.classList.contains('dark-mode')
  }
  checkDarkMode()
  const observer = new MutationObserver(checkDarkMode)
  observer.observe(document.documentElement, { attributes: true })
})

// SCROLL REVEAL
onMounted(() => {
  const els = document.querySelectorAll('[data-reveal]')
  const check = () => {
    els.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.85) el.classList.add('revealed')
    })
  }
  window.addEventListener('scroll', check)
  check()
})

// ✅ BLOCK ALL VERTICAL SCROLLING ON THIS PAGE
onMounted(() => {
  document.body.style.overflowY = 'hidden'
  document.documentElement.style.overflowY = 'hidden'
})

// ✅ RESTORE SCROLL WHEN LEAVING PAGE
onBeforeUnmount(() => {
  document.body.style.overflowY = 'auto'
  document.documentElement.style.overflowY = 'auto'
})

// Submit
const sendForm = async () => {
  loading.value = true

  await new Promise((r) => setTimeout(r, 800))

  loading.value = false
  showSuccess.value = true

  playFire()

  form.name = ''
  form.email = ''
  form.message = ''

  setTimeout(() => (showSuccess.value = false), 2000)
}
</script>

<style scoped lang="scss">
$china-red: #c41e3a;
$china-gold: #d4af37;
$china-black: #0a0a0a;
$white: #fff;
$gray: #f8f8f8;
$dark-card: #1a1a1a;

// Breakpoints
$breakpoint-phone: 320px;
$breakpoint-tablet: 768px;
$breakpoint-laptop: 1024px;
$breakpoint-desktop: 1440px;

// ✅ FINAL FIX: NO SCROLL, NO OVERFLOW
.contact-section {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  max-height: 100vh;
  background: $white;
  overflow: hidden !important;
  padding: 2rem 1.5rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;

  :global(.dark-mode) & {
    background: $china-black;
  }
}

.container {
  width: 100%;
  max-height: 100%;
  margin: 0 auto;
}

/* Title */
.section-title {
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  color: $china-red;
  margin-bottom: 0.8rem;

  :global(.dark-mode) & {
    color: $china-gold;
  }
}

.sub-title {
  font-size: clamp(0.95rem, 2vw, 1.1rem);
  opacity: 0.8;
  max-width: 500px;
  margin: 0 auto;
}

/* Grid */
.contact-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  max-width: 650px;
  margin: 0 auto;
}

/* Form Card */
.form-card {
  background: $gray;
  border-radius: 16px;
  padding: clamp(1.2rem, 3vw, 2rem);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease;
  box-sizing: border-box;

  :global(.dark-mode) & {
    background: $dark-card;
    color: $white;
  }

  &.revealed {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Text Effects */
.jump-text {
  animation: jump 1.8s infinite alternate ease-in-out;
}
.tremble-text {
  animation: tremble 0.9s infinite alternate ease-in-out;
}

@keyframes jump {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-4px);
  }
}
@keyframes tremble {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(1px);
  }
  100% {
    transform: translateX(-1px);
  }
}

/* Form */
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  label {
    font-size: 0.9rem;
    font-weight: 500;
  }
}

.input {
  padding: 0.8rem 1rem;
  border-radius: 8px;
  border: 2px solid transparent;
  background: #fcfcfc;
  font-size: 0.95rem;
  transition: all 0.3s ease;

  :global(.dark-mode) & {
    background: #242424;
    border-color: #333;
    color: $white;
  }

  &:focus {
    outline: none;
    border-color: $china-red;

    :global(.dark-mode) & {
      border-color: $china-gold;
    }
  }

  &.invalid {
    border-color: red;
  }
}

/* Button */
.btn-hover {
  padding: 0.9rem;
  border-radius: 8px;
  background: $china-red;
  color: $white;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  :global(.dark-mode) & {
    background: $china-gold;
    color: $china-black;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(196, 17, 58, 0.2);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

/* Stagger */
[data-stagger] {
  opacity: 0;
  transform: translateY(12px);
  transition: all 0.5s ease;

  .revealed & {
    opacity: 1;
    transform: translateY(0);
  }
}

@for $i from 1 through 15 {
  [data-stagger]:nth-child(#{$i}) {
    transition-delay: 0.1s + $i * 0.08s;
  }
}

// Success Animation
.success-animation {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  pointer-events: none;
  max-width: 260px;

  &.show {
    transform: translate(-50%, -50%) scale(1);
  }
}

.dragon-img {
  width: 100%;
  height: auto;
  animation: dragonPulse 1.2s infinite alternate ease-in-out;
}

.success-text {
  margin-top: 0.8rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: $china-red;

  :global(.dark-mode) & {
    color: $china-gold;
  }
}

@keyframes dragonPulse {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.05);
  }
}

// Mobile
@media (max-width: $breakpoint-phone) {
  .contact-section {
    padding: 1rem;
  }
  .form-card {
    padding: 1rem;
  }
}
</style>
