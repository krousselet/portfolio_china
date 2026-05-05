<template>
  <section class="about-section-wrapper">
    <div class="horizontal-scroll" ref="scrollContainer">
      <div class="horizontal-track">
        <!-- TITLE CARD -->
        <div class="card card-large" data-animate>
          <h2 class="jumbo-title" data-stagger>{{ $t('about.title') }}</h2>
        </div>

        <!-- CARD 1 -->
        <div class="card" data-animate>
          <h3 class="jump-text" data-stagger>{{ $t('about.myself') }}</h3>
          <p class="tremble-text text-slide-up" data-stagger>{{ $t('about.myselfDesc') }}</p>
        </div>

        <!-- CARD 2 -->
        <div class="card" data-animate>
          <h3 class="jump-text" data-stagger>{{ $t('about.webDev') }}</h3>
          <p class="tremble-text text-slide-up" data-stagger>{{ $t('about.webDevDesc') }}</p>
          <div class="skills-grid">
            <div v-for="skill in skillsWebDev" class="skill-bubble" data-stagger :key="skill">
              {{ skill }}
            </div>
          </div>
        </div>

        <!-- CARD 3 -->
        <div class="card" data-animate>
          <h3 class="jump-text" data-stagger>{{ $t('about.writer') }}</h3>
          <p class="tremble-text text-slide-up" data-stagger>{{ $t('about.writerDesc') }}</p>
          <div class="skills-grid">
            <div v-for="skill in skillsArt" class="skill-bubble" data-stagger :key="skill">
              {{ skill }}
            </div>
          </div>
        </div>

        <!-- CARD 4 -->
        <div class="card" data-animate>
          <h3 class="jump-text" data-stagger>{{ $t('about.flight') }}</h3>
          <p class="tremble-text text-slide-up" data-stagger>{{ $t('about.flightDesc') }}</p>
          <div class="skills-grid">
            <div v-for="skill in skillsCca" class="skill-bubble" data-stagger :key="skill">
              {{ skill }}
            </div>
          </div>
        </div>

        <!-- CARD 5 -->
        <div class="card" data-animate>
          <h3 class="jump-text" data-stagger>{{ $t('about.introspection') }}</h3>
          <p class="tremble-text text-slide-up" data-stagger>{{ $t('about.introspectionDesc') }}</p>
          <div class="skills-grid">
            <div v-for="skill in skillsLanguages" class="skill-bubble" data-stagger :key="skill">
              {{ skill }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const skillsWebDev = [
  'Vue 3',
  'JavaScript',
  'HTML/CSS',
  'MySql',
  'Php',
  'Sass',
  'Symphony',
  'Trello',
  'OOP',
  'SEO',
]
const skillsArt = [
  'Innovation',
  'Voiceover',
  'AI',
  'Prompts Efficiency',
  'Style',
  'Creativity',
  'Resilience',
]
const skillsCca = [
  'Calm',
  'Determined',
  'Focused',
  'Stress Proof',
  'Languages',
  'Self Esteem',
  'Reliability',
]
const skillsLanguages = [
  'French',
  'English',
  'Italian',
  'Spanish',
  'Bahasa',
  'Russian',
  'Chinese',
  'Japanese',
  'Piano',
]

const scrollContainer = ref(null)

onMounted(() => {
  const container = scrollContainer.value
  if (!container) return

  container.addEventListener(
    'wheel',
    (e) => {
      e.preventDefault()
      container.scrollBy({
        left: e.deltaY * 1.8,
        behavior: 'auto',
      })
    },
    { passive: false },
  )

  const cards = document.querySelectorAll('[data-animate]')
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('visible', entry.isIntersecting)
      })
    },
    {
      root: container,
      threshold: 0.4,
    },
  )

  cards.forEach((card) => observer.observe(card))
})
</script>

<style scoped lang="scss">
$china-red: #c41e3a;
$china-gold: #d4af37;
$china-black: #0a0a0a;
$white: #fff;
$card-bg: #f8f8f8;
$card-dark: #1a1a1a;

.about-section-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: $white;

  :global(.dark-mode) & {
    background: $china-black;
  }
}

.horizontal-scroll {
  width: 100%;
  height: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  overscroll-behavior: none;

  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: $china-red;
    border-radius: 6px;

    :global(.dark-mode) & {
      background: $china-gold;
    }
  }
}

.horizontal-track {
  display: flex;
  height: 100%;
  width: max-content;
  align-items: center;
  gap: 1.5rem;
  padding: 0 2rem;
}

.card {
  width: 88vw;
  max-width: 460px;
  min-height: auto;
  background: $card-bg;
  border-radius: 18px;
  padding: 2rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  scroll-snap-align: center;
  opacity: 0;
  transform: translateX(50px) scale(0.82);
  transition: all 0.85s cubic-bezier(0.16, 1, 0.3, 1);

  :global(.dark-mode) & {
    background: $card-dark;
    color: $white;
  }

  &.visible {
    opacity: 1;
    transform: translateX(0) scale(1);
  }

  &.card-large {
    max-width: 600px;
  }
}

.text-slide-up {
  transform: translateY(60px) scale(0.95);
  opacity: 0;
  transition: all 0.9s cubic-bezier(0.2, 1, 0.3, 1);

  .visible & {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@function stagger-delay($index, $base: 0.14s, $step: 0.11s) {
  @return $base + ($index * $step);
}

[data-stagger] {
  opacity: 0;
  transform: translateY(18px);
  transition: all 0.55s cubic-bezier(0.2, 1, 0.3, 1);

  .visible & {
    opacity: 1;
    transform: translateY(0);
  }
}

@for $i from 1 through 30 {
  [data-stagger]:nth-child(#{$i}) {
    transition-delay: stagger-delay($i);
  }
}

.jumbo-title {
  font-size: clamp(2rem, 5vw, 3.2rem);
  color: $china-red;
  animation: jump 2.2s infinite alternate ease-in-out;

  :global(.dark-mode) & {
    color: $china-gold;
  }
}

.jump-text {
  font-size: clamp(1.2rem, 3vw, 1.6rem);
  margin-bottom: 1rem;
  animation: jump 1.8s infinite alternate ease-in-out;
}

.tremble-text {
  line-height: 1.65;
  opacity: 0.85;
  animation: tremble 0.9s infinite alternate ease-in-out;
}

.skills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 1.2rem;
}

.skill-bubble {
  padding: 0.5rem 0.9rem;
  background: $white;
  border-radius: 50px;
  font-size: 0.8rem;
  font-weight: 600;
  color: $china-red;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  animation: float 3s infinite alternate ease-in-out;

  :global(.dark-mode) & {
    background: #242424;
    color: $china-gold;
  }
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
@keyframes float {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-3px);
  }
}
</style>
