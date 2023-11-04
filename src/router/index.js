import { createRouter, createWebHistory } from 'vue-router';
import { useUsersStore } from '../store/users';
import AllRoutes from '../routes';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...AllRoutes,
    {
      path: '/',
      name: 'home',
      component: () => import('../App.vue'),
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: () => import('../views/error/404Error.vue'),
    },
  ],
});

// Authentication
router.beforeEach((to, from, next) => {
  const store = useUsersStore();
  if (to.meta.requiresAuth && !store.isLoggedIn) {
    router.push({ name: 'login' });
  }
  // All is good and continue
  next();
});

export default router;
