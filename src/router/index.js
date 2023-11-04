import { createRouter, createWebHistory } from 'vue-router';
import { useUsersStore } from '../store/users';
import routes from '../routes';

const router = createRouter({
  history: createWebHistory(),
  routes: [...routes],
});

// Authentication
router.beforeEach((to, from, next) => {
  const store = useUsersStore();
  // Maybe delete this since it's one pager
  if (to.meta.requiresAuth && !store.isLoggedIn) {
    router.push({ name: 'login' });
  }
  // All is good and continue
  next();
});

export default router;
