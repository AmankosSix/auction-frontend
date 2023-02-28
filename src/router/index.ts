import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AuthView from '@/views/AuthView.vue'
import { useStore } from '@/store'

const store = useStore()

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
    path: '/account',
    name: 'AuthView',
    component: AuthView,
    meta: {
      breadCrumb: 'Profile'
    },
    children: [
      {
        path: '',
        name: 'UserProfile',
        component: () => import('@/components/Account/Profile/UserProfile.vue'),
        meta: {
          authRequired: true,
          breadCrumb: 'Username'
        }
      },
      {
        path: 'sign-in',
        name: 'SignIn',
        component: () => import('@/components/Account/SignIn/SignIn.vue'),
        meta: {
          breadCrumb: 'Sign In'
        }
      },
      {
        path: 'sign-up',
        name: 'SignUp',
        component: () => import('@/components/Account/SignUp/SignUp.vue'),
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

router.beforeEach((to, from, next) => {
  if (to.meta?.authRequired === true) {
    if (store.getters.isAuthenticated) {
      return next()
    }
    return next({ name: 'SignIn' })
  }
  return next()
})

export default router
