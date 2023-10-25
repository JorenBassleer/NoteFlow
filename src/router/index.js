import { createRouter, createWebHistory } from 'vue-router';
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
      component: '',
    },
  ],
});

// Authentication
router.beforeEach(async (to) => {
  if (to.meta.requiresAuth) {
    // eslint-disable-next-line no-constant-condition, no-self-compare
    if ('user is not logged in') {
      return '/login';
    }
  }
  // All is good and continue
  return true;
});

export default router;
