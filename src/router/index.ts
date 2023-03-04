import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AuthView from '@/views/AuthView.vue'
import OwnerView from '@/views/OwnerView.vue'
import { useStore } from '@/store'

const store = useStore()
const token = localStorage.getItem('token')

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
        component: () => import('@/components/Account/UserProfile.vue'),
        meta: {
          authRequired: true,
          breadCrumb: 'Username'
        }
      },
      {
        path: 'sign-in',
        name: 'SignIn',
        component: () => import('@/components/Account/SignIn.vue'),
        meta: {
          breadCrumb: 'Sign In'
        }
      },
      {
        path: 'sign-up',
        name: 'SignUp',
        component: () => import('@/components/Account/SignUp.vue'),
        meta: {
          breadCrumb: 'Sign Up'
        }
      }
    ]
  },
  {
    path: '/owner',
    name: 'OwnerView',
    component: OwnerView,
    meta: {
      authRequired: true,
      breadCrumb: 'Owner view'
    },
    children: [
      {
        path: '',
        name: 'StaffList',
        component: () => import('@/components/Owner/StaffList.vue'),
        meta: {
          authRequired: true,
          breadCrumb: 'Staff list'
        }
      },
      {
        path: 'register',
        name: 'StaffRegister',
        component: () => import('@/components/Account/SignUp.vue'),
        meta: {
          authRequired: true,
          breadCrumb: 'Staff Registration'
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  if (
    to.meta?.authRequired === true &&
    !store.getters.isAuthenticated &&
    !token
  ) {
    return next({ name: 'SignIn' })
  }
  return next()
})

export default router
