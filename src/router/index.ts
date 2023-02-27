import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AuthView from '@/views/AuthView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView,
    meta: {
      breadCrumb: 'Home'
    },
    children: [
      {
        path: '',
        name: 'HomeComponent',
        component: () => import('@/components/Home/HomeComponent.vue'),
        meta: {
          breadCrumb: 'Main'
        }
      }
    ]
  },
  {
    path: '/auth',
    name: 'AuthView',
    component: AuthView,
    meta: {
      breadCrumb: 'Auth'
    },
    children: [
      {
        path: 'sign-in',
        name: 'SignIn',
        component: () => import('@/components/Auth/SignIn/SignIn.vue'),
        meta: {
          breadCrumb: 'Sign In'
        }
      },
      {
        path: 'sign-up',
        name: 'SignUp',
        component: () => import('@/components/Auth/SignUp/SignUp.vue'),
        meta: {
          breadCrumb: 'Sign Up'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
