import { createRouter, createWebHistory } from 'vue-router';
import routes from '../routes';

const router = createRouter({
  history: createWebHistory(),
  routes: [...routes],
});

// Authentication
router.beforeEach((to, from, next) => {
  next();
});

export default router;
