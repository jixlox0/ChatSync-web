import { createRouter, createWebHistory } from 'vue-router'
import loginView from '@/views/login-view.vue'
import SignupView from '@/views/signup-view.vue'
import NotFound from '@/views/not-found.vue'
import ChatView from '@/views/chat/chat-view.vue'

const routes = [
  {
    path: '/',
    component: ChatView,
  },
  {
    path: '/login',
    component: loginView,
  },
  {
    path: '/signup',
    component: SignupView,
  },
  {
    path: '/:pathmatch(.*)*',
    component: NotFound,
  },
]

const router = createRouter({ history: createWebHistory(), routes })

export { router }
