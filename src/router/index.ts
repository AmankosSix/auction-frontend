import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/Home.vue'
import AuthView from '@/views/Auth.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    children: [
      {
        path: '',
        component: () => import('@/components/Home/HomeComponent.vue')
      }
    ]
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthView,
    children: [
      {
        path: 'sign-in',
        name: 'signIn',
        component: () => import('@/components/Auth/SignIn/SignIn.vue')
      },
      {
        path: 'sign-up',
        name: 'signUp',
        component: () => import('@/components/Auth/SignUp/SignUp.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
