<template>
  <section class="contact-section min-h-screen pt-24 pb-16 px-4">
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
      />
      <img
        v-if="isDarkMode"
        src="/images/dragon_white.png"
        alt="Dragon Dark Mode"
        class="dragon-img"
      />
      <span class="success-text">{{ $t('contact.successText') }}</span>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
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

// Scroll Reveal
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

// Submit
const sendForm = async () => {
  loading.value = true

  await new Promise((r) => setTimeout(r, 800))

  loading.value = false
  showSuccess.value = true

  //  PLAY FIRE SOUND ON SUCCESS
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

.contact-section {
  background: $white;
  min-height: 100vh;
  transition: background 0.3s ease;

  :global(.dark-mode) & {
    background: $china-black;
  }
}

/* Title */
.section-title {
  font-size: 2.8rem;
  color: $china-red;
  margin-bottom: 0.8rem;

  :global(.dark-mode) & {
    color: $china-gold;
  }
}

.sub-title {
  font-size: 1.1rem;
  opacity: 0.8;
  max-width: 600px;
  margin: 0 auto;
}

/* Grid */
.contact-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  max-width: 900px;
  margin: 0 auto;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1.2fr;
    align-items: center;
  }
}

/* Form Card */
.form-card {
  background: $gray;
  border-radius: 18px;
  padding: 2rem;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
  opacity: 0;
  transform: translateY(40px);
  transition: all 0.8s ease;

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
    transform: translateY(-5px);
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
  gap: 1.2rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  label {
    font-size: 0.95rem;
    font-weight: 500;
  }
}

.input {
  padding: 0.9rem 1.1rem;
  border-radius: 10px;
  border: 2px solid transparent;
  background: lighten($gray, 4%);
  font-size: 1rem;
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
  padding: 1rem;
  border-radius: 10px;
  background: $china-red;
  color: $white;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;

  :global(.dark-mode) & {
    background: $china-gold;
    color: $china-black;
  }

  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 0 6px 14px rgba(196, 17, 58, 0.25);

    :global(.dark-mode) & {
      box-shadow: 0 6px 14px rgba(212, 175, 55, 0.25);
    }
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
}

/* Stagger */
[data-stagger] {
  opacity: 0;
  transform: translateY(15px);
  transition: all 0.6s ease;

  .revealed & {
    opacity: 1;
    transform: translateY(0);
  }
}

@for $i from 1 through 15 {
  [data-stagger]:nth-child(#{$i}) {
    transition-delay: 0.15s + $i * 0.1s;
  }
}

// ✨ SUCCESS ANIMATION
.success-animation {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  pointer-events: none;
  width: 100%;
  max-width: 300px;

  &.show {
    transform: translate(-50%, -50%) scale(1);
  }
}

.dragon-img {
  width: 100%;
  height: auto;
  object-fit: contain;
  animation: dragonPulse 1.2s infinite alternate ease-in-out;
}

.success-text {
  margin-top: 1rem;
  font-size: 1.2rem;
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
</style>
