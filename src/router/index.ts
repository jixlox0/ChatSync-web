import { createRouter, createWebHistory } from 'vue-router'
import loginView from '@/views/login-view.vue'
import SignupView from '@/views/signup-view.vue'
import NotFound from '@/views/not-found.vue'
import ChatView from '@/views/chat/chat-view.vue'
import { authRoutes, baseRoutes } from '@/types/routes'

const routes = [
  {
    path: baseRoutes.root,
    component: ChatView,
  },
  {
    path: authRoutes.auth.login,
    component: loginView,
  },
  {
    path: authRoutes.auth.signup,
    component: SignupView,
  },
  {
    path: '/:pathmatch(.*)*',
    component: NotFound,
  },
]

const router = createRouter({ history: createWebHistory(), routes })

export { router }
