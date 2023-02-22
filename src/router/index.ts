import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AuthView from '@/views/AuthView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView,
    children: [
      {
        path: '',
        name: 'HomeComponent',
        component: () => import('@/components/Home/HomeComponent.vue')
      }
    ]
  },
  {
    path: '/auth',
    name: 'AuthView',
    component: AuthView,
    children: [
      {
        path: 'sign-in',
        name: 'SignIn',
        component: () => import('@/components/Auth/SignIn/SignIn.vue')
      },
      {
        path: 'sign-up',
        name: 'SignUp',
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
