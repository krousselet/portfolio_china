<template>
  <section class="projects min-h-screen pt-24 py-16">
    <div class="container mx-auto px-4">
      <h2 class="section-title no-cursor">{{ $t('projects.title') }}</h2>

      <Swiper
        :modules="[Navigation, Pagination]"
        :slides-per-view="1"
        :space-between="20"
        :breakpoints="{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }"
        navigation
        pagination
        class="slider"
      >
        <SwiperSlide v-for="project in projects" :key="project.id">
          <div class="card project-card">
            <h3 class="no-cursor">{{ $t(project.name) }}</h3>
            <p class="no-cursor">{{ $t(project.desc) }}</p>

            <a :href="project.link1" target="_blank" class="project-link mt-3 block">
              {{ $t(project.anchor1) }}
            </a>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const projects = [
  {
    id: 1,
    name: 'projects.memoryGameName',
    desc: 'projects.memoryGameDesc',
    anchor1: 'projects.memoryGameBtn',
    link1: 'https://memory-adamrod.netlify.app/',
  },
  {
    id: 2,
    name: 'projects.movieQuizName',
    desc: 'projects.movieQuizDesc',
    anchor1: 'projects.movieQuizBtn',
    link1: 'https://newmoviequiz-adamrod.netlify.app/',
  },
  {
    id: 3,
    name: 'projects.portfolioName',
    desc: 'projects.portfolioDesc',
    anchor1: 'projects.portfolioBtn',
    link1: '#',
  },
]
</script>

<style scoped lang="scss">
$china-red: #c41e3a;
$china-gold: #d4af37;
$china-black: #0a0a0a;
$white: #ffffff;

.projects {
  background: #f9f9f9;

  :global(.dark-mode) & {
    background: $china-black;
  }
}

.section-title {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 3rem;
  color: $china-red;

  :global(.dark-mode) & {
    color: $china-gold;
  }
}

.slider {
  padding-bottom: 3rem;
}

.project-card {
  height: 100%;
  background: $white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  :global(.dark-mode) & {
    background: #1a1a1a;
    color: white;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
  }

  h3 {
    font-size: 1.4rem;
    margin-bottom: 0.8rem;
  }

  p {
    opacity: 0.8;
    margin-bottom: 1rem;
    line-height: 1.5;
  }

  .tech {
    display: inline-block;
    color: $china-red;
    font-weight: 600;
    margin-bottom: 1rem;

    :global(.dark-mode) & {
      color: $china-gold;
    }
  }

  .project-link {
    color: $china-red;
    font-weight: 500;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }

    :global(.dark-mode) & {
      color: $china-gold;
    }
  }
}
</style>
