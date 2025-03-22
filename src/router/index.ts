import { createRouter, createWebHistory } from 'vue-router'
import loginView from '@/views/login-view.vue'
import SignupView from '@/views/signup-view.vue'

const routes = [
  {
    path: '/',
    component: loginView,
  },
  {
    path: '/login',
    component: loginView,
  },
  {
    path: '/signup',
    component: SignupView,
  },
]

const router = createRouter({ history: createWebHistory(), routes })

export { router }
