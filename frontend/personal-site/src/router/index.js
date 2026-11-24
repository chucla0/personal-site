import { createRouter, createWebHistory } from 'vue-router'
import Landing from '../views/Landing.vue'
import NotFound from '../views/NotFound.vue'
import Overview from '../views/Overview.vue'
import Project from '../views/Project.vue'
import { projects } from '../projects'

// Old addresses now point to a stop in the landing
const toStop = (hash) => ({ path: '/', hash })

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // The landing moves itself to its sections
  scrollBehavior: (to, from, saved) => saved || (to.hash ? false : { top: 0 }),
  routes: [
    { path: '/', name: 'Landing', component: Landing },
    { path: '/resumen', component: Overview },
    { path: `/:slug(${projects.map((p) => p.key).join('|')})`, component: Project, props: true },
    { path: '/projects', redirect: toStop('#projects') },
    { path: '/about', redirect: toStop('#about') },
    { path: '/skills', redirect: toStop('#about') },
    { path: '/contact', redirect: toStop('#contact') },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
  ]
})
