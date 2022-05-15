import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import store from '../store/index';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login/',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/register/',
    name: 'register',
    component: () => import('../views/RegisterView.vue')
  },
  {
    path: '/dashboard/',
    name: 'dashboardHome',
    component: () => import('../views/dashboard/DashboardView.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'documentation/',
        name: 'documentation',
        component: () => import('../views/dashboard/DashboardView.vue')
      },
      {
        path: 'developer/',
        name: 'developer',
        component: () => import('../views/dashboard/DashboardView.vue')
      },
      {
        path: 'statistics/',
        name: 'statistics',
        component: () => import('../views/dashboard/DashboardView.vue')
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to) {
    if (to.hash !== '') {
      return { 
        el: to.hash,
        behavior: 'smooth'
      }
    }

    return { top: 0 }
  }
});

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !store.getters.token) {
    return {
      path: '/login',
      query: { redirect: to.fullPath }
    }
  }
})

export default router
