import { createRouter, createWebHistory } from 'vue-router'

// 🔥 LAZY LOADED ROUTES (only load when needed)
const Home = () => import('../views/Home.vue')
const Projects = () => import('../views/Projects.vue')
const About = () => import('../views/About.vue')
const Resume = () => import('../views/Resume.vue')
const Contact = () => import('../views/Contact.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/projects',
    name: 'Projects',
    component: Projects,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/resume',
    name: 'Resume',
    component: Resume,
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
  },
  // Catch 404 -> redirect to home
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  // STABLE HISTORY MODE (NO # IN URL)
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
