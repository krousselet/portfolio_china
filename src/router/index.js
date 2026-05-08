import { createRouter, createWebHistory } from 'vue-router'

// STATIC IMPORT (NO lazy load) FOR HOME
import Home from '../views/Home.vue'

// LAZY LOAD other pages (fine, they are not LCP)
const About = () => import('../views/About.vue')
const Projects = () => import('../views/Projects.vue')
const Resume = () => import('../views/Resume.vue')
const Contact = () => import('../views/Contact.vue')

const routes = [
  { path: '/', name: 'Home', component: Home }, // 👈 FAST now
  { path: '/about', name: 'About', component: About },
  { path: '/projects', name: 'Projects', component: Projects },
  { path: '/resume', name: 'Resume', component: Resume },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
