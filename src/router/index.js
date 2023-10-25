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
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    // eslint-disable-next-line no-constant-condition, no-self-compare
    if (false) {
      router.push({ name: 'login' });
    }
  }
  // All is good and continue
  next();
});

export default router;
