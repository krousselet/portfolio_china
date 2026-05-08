<template>
  <div class="resume-fullpage">
    <div class="scroll-sentinel"></div>

    <div class="panels">
      <!-- PANEL 1: ONLY TRUE CENTER -->
      <section class="panel" data-panel>
        <div class="profile-card" data-slide-in>
          <div class="avatar">
            <img src="/images/me.png" alt="Developer face" loading="lazy" />
          </div>
          <div class="profile-text">
            <h1 class="heading-primary jump-text no-cursor">Kevin Rousselet</h1>
            <p class="subheading tremble-text no-cursor">
              {{ $t('resume.subheading') }}
            </p>
            <div class="contact-details">
              <p class="no-cursor">adamrodwebdev@163.com</p>
              <p class="no-cursor">adamrodwebdev@gmail.com</p>
              <p class="no-cursor">Hefei, China</p>
              <div class="logo-container tremble-text">
                <!-- INSTAGRAM -->
                <a
                  href="https://www.instagram.com/adamrod.alternativearts/?hl=fr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="/images/instagram.png" alt="Instagram logo" loading="lazy" />
                </a>
                <!-- YOUTUBE -->
                <a
                  href="https://www.youtube.com/@adamrod-alternativearts"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src="/images/youtube.png" alt="YouTube logo" loading="lazy" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- PANEL 2 -->
      <section class="panel" data-panel>
        <div class="card card-expertise" data-slide-in>
          <h2 class="heading-secondary jump-text no-cursor">{{ $t('resume.expertiseTitle') }}</h2>
          <div class="tags">
            <div class="tag no-cursor" data-slide-item v-for="s in expertise" :key="s">{{ s }}</div>
          </div>
        </div>

        <div class="card card-languages no-cursor" data-slide-in>
          <h2 class="heading-secondary jump-text">{{ $t('resume.languagesTitle') }}</h2>
          <div class="languages">
            <div class="lang" data-slide-item v-for="l in languages" :key="l.name">
              <span>{{ l.name }}</span>
              <span>{{ $t(l.level) }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- PANEL 3 -->
      <section class="panel" data-panel>
        <div class="card card-experience" data-slide-in>
          <h2 class="heading-secondary jump-text no-cursor">{{ $t('resume.experienceTitle') }}</h2>
          <div class="timeline">
            <div class="tl-item" data-slide-item v-for="(x, i) in experience" :key="i">
              <div class="year no-cursor">{{ x.year }}</div>
              <div class="text no-cursor">
                <h3 class="no-cursor">{{ $t(x.titleKey) }}</h3>
                <p class="no-cursor">{{ $t(x.descKey) }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- PANEL 4 -->
      <section class="panel" data-panel>
        <div class="card card-education" data-slide-in>
          <h2 class="heading-secondary jump-text no-cursor">{{ $t('resume.educationTitle') }}</h2>
          <div class="timeline">
            <div class="tl-item" data-slide-item v-for="(x, i) in education" :key="i">
              <div class="year">{{ x.year }}</div>
              <div class="text">
                <h3 class="no-cursor">{{ $t(x.titleKey) }}</h3>
                <p class="no-cursor">{{ $t(x.descKey) }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- PANEL 5 -->
      <section class="panel" data-panel>
        <div class="card card-extra" data-slide-in>
          <h2 class="heading-secondary jump-text no-cursor">{{ $t('resume.extraTitle') }}</h2>
          <div class="tags">
            <div class="tag no-cursor" data-slide-item v-for="s in extra" :key="s">{{ s }}</div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useSounds } from '@/composables/useSounds'

const { playRisingSlide, resetRisingSound } = useSounds()

// Static skill lists
const expertise = ref([
  'Team Management & Coordination',
  'Transaction Handling',
  'Fluent English',
  'Customer Service',
  'Self-Management',
])
const languages = ref([
  { name: 'English', level: 'resume.langLevelB2Lilate' },
  { name: 'Italian', level: 'resume.langLevelB2' },
  { name: 'Spanish', level: 'resume.langLevelB2' },
  { name: 'Russian', level: 'resume.langLevelA2' },
  { name: 'Chinese', level: 'resume.langLevelA1' },
])
const experience = ref([
  {
    year: '2011–2018',
    titleKey: 'resume.exp1Title',
    descKey: 'resume.exp1Desc',
  },
  {
    year: '2019–2021',
    titleKey: 'resume.exp2Title',
    descKey: 'resume.exp2Desc',
  },
  {
    year: 'Ongoing',
    titleKey: 'resume.exp3Title',
    descKey: 'resume.exp3Desc',
  },
  {
    year: '2023',
    titleKey: 'resume.exp4Title',
    descKey: 'resume.exp4Desc',
  },
  {
    year: '2025',
    titleKey: 'resume.exp5Title',
    descKey: 'resume.exp5Desc',
  },
])
const education = ref([
  { year: '2011', titleKey: 'resume.edu1Title', descKey: 'resume.edu1Desc' },
  { year: '2011–2013', titleKey: 'resume.edu2Title', descKey: 'resume.edu2Desc' },
  { year: '2013–2014', titleKey: 'resume.edu3Title', descKey: 'resume.edu3Desc' },
  { year: '2023', titleKey: 'resume.edu4Title', descKey: 'resume.edu4Desc' },
])
const extra = ref([
  'Mountain Biking • 60km/week',
  'Piano • 20 years practice',
  'Tech & Cultural Monitoring',
  'Creative Writing',
  'Stress Resistance',
])

let lastPanel = -1

onMounted(() => {
  const panels = document.querySelectorAll('[data-panel]')
  const sentinel = document.querySelector('.scroll-sentinel')
  sentinel.style.height = `${panels.length * 100}vh`

  function update() {
    const h = window.innerHeight
    const top = window.scrollY
    const current = Math.floor(top / h)

    if (current !== lastPanel) {
      if (current === 0) {
        resetRisingSound()
      }
      playRisingSlide()
      lastPanel = current
    }

    panels.forEach((panel, i) => {
      const slide = panel.querySelector('[data-slide-in]')
      const items = panel.querySelectorAll('[data-slide-item]')

      if (i === current) {
        panel.style.opacity = '1'
        panel.style.transform = 'translateY(0)'
        panel.style.pointerEvents = 'auto'
        if (slide) slide.classList.add('active')
        items.forEach((it, k) => setTimeout(() => it.classList.add('active'), 140 * k))
      } else {
        panel.style.opacity = '0'
        panel.style.transform = 'translateY(60px)'
        panel.style.pointerEvents = 'none'
        if (slide) slide.classList.remove('active')
        items.forEach((it) => it.classList.remove('active'))
      }
    })
  }

  window.addEventListener('scroll', update)
  update()

  onUnmounted(() => window.removeEventListener('scroll', update))
})
</script>

<style scoped lang="scss">
$red: #c41e3a;
$gold: #d4af37;
$black: #0a0a0a;
$white: #fff;

/* CORE */
.resume-fullpage {
  position: relative;
  width: 100%;
  overflow: hidden;
}
.scroll-sentinel {
  position: relative;
  z-index: 1;
}
.panels {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 2;
  overflow: hidden;
}
.panel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: $white;
  transition: all 0.7s cubic-bezier(0.2, 1, 0.3, 1);
  opacity: 0;
  pointer-events: none;

  :global(.dark-mode) & {
    background: $black;
  }
}

/* PROFILE CARD — CENTERED */
.panel:first-child {
  display: flex;
  align-items: center;
  justify-content: center;
}
.profile-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  text-align: center;
}

/* EXPERIENCE PANEL — CENTERED EXACTLY LIKE PROFILE */
.panel:nth-child(3) {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* BASE CARD */
.card {
  position: absolute;
  width: 420px;
  max-width: 85%;
  padding: 2.2rem;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);

  :global(.dark-mode) & {
    background: rgba(0, 0, 0, 0.15);
  }
}

/* ASYMMETRIC POSITIONS */
.card-expertise {
  top: 50%;
  left: 7%;
  transform: translateY(-50%);
}
.card-languages {
  top: 10%;
  right: 7%;
}
/* ✅ CENTERED — NO ABSOLUTE, NO OVERFLOW */
.card-experience {
  position: relative;
  width: 90%;
  max-width: 650px;
  max-height: 80vh;
  overflow-y: auto;
}
.card-education {
  bottom: 10%;
  left: 7%;
  width: 520px;
  max-width: 85%;
}
.card-extra {
  bottom: 10%;
  right: 7%;
  width: 460px;
  max-width: 85%;
}

/* Scrollbar */
.card-experience::-webkit-scrollbar {
  width: 5px;
}
.card-experience::-webkit-scrollbar-thumb {
  background: $red;
  border-radius: 10px;
  :global(.dark-mode) & {
    background: $gold;
  }
}
.card-experience::-webkit-scrollbar-track {
  background: transparent;
}

/* SLIDE ANIMATION */
[data-slide-in],
[data-slide-item] {
  opacity: 0;
  transform: translateX(140px);
  transition: all 1s cubic-bezier(0.2, 1, 0.3, 1);
}
[data-slide-in].active,
[data-slide-item].active {
  opacity: 1;
  transform: translateX(0);
}

/* STYLES */
.avatar {
  margin-top: 100px;
  width: 250px;
  height: 250px;
  border-radius: 50%;

  /* This creates the animated glowing border container */
  position: relative;
  background: transparent;
  display: flex;
  justify-content: center;
  align-items: center;

  /* 🔴 ROTATING GLOWING ANIMATION BORDER */
  &::before {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border-radius: 50%;
    background: conic-gradient(from 0deg, #ff2c4b 0%, #c41e3a 50%, #ff6b81 100%);
    animation: rotate-glow 3s linear infinite;
    z-index: -1;
    filter: blur(6px);
    opacity: 0.9;
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    position: relative;
    z-index: 1;
  }
}

.heading-primary {
  font-size: clamp(1.8rem, 5vw, 2.6rem);
  font-weight: 700;
  color: $red;
  :global(.dark-mode) & {
    color: $gold;
  }
}
.subheading {
  font-size: 1.05rem;
  opacity: 0.8;
}
.contact-details {
  font-size: 0.95rem;
  opacity: 0.75;

  .logo-container {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
}
.heading-secondary {
  font-size: 1.5rem;
  font-weight: 700;
  color: $red;
  text-align: center;
  margin-bottom: 1.4rem;
  :global(.dark-mode) & {
    color: $gold;
  }
}

.tags {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.8rem;
}
.tag {
  padding: 0.7rem 1.2rem;
  border-radius: 50px;
  background: rgba(0, 0, 0, 0.03);
  color: $red;
  transition: 0.3s;
  font-weight: 600;

  :global(.dark-mode) & {
    background: rgba(255, 255, 255, 0.04);
    color: $gold;
  }
  &:hover {
    background: $red;
    color: white;
    transform: translateY(-2px);
    :global(.dark-mode) & {
      background: $gold;
      color: $black;
    }
  }
}

.languages {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.lang {
  display: flex;
  justify-content: space-between;
  padding: 0.7rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  :global(.dark-mode) & {
    border-color: rgba(255, 255, 255, 0.06);
  }
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}
.tl-item {
  display: flex;
  gap: 1.4rem;
}
.year {
  min-width: 90px;
  font-weight: 700;
  color: $red;
  :global(.dark-mode) & {
    color: $gold;
  }
}
.text h3 {
  font-size: 1.05rem;
  margin-bottom: 0.3rem;
}
.text p {
  font-size: 0.95rem;
  opacity: 0.75;
  line-height: 1.5;
}

/* ANIMATIONS */
.jump-text {
  animation: jump 1.9s infinite alternate ease-in-out;
}
.tremble-text {
  animation: tremble 0.9s infinite alternate ease-in-out;
}

/* ROTATION ANIMATION */
@keyframes rotate-glow {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
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

/* MOBILE */
@media (max-width: 900px) {
  .panel {
    display: flex !important;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 1.5rem;
  }
  .card,
  .profile-card {
    position: relative;
    transform: none !important;
    margin: 1rem auto;
    width: 100%;
  }
}
</style>
