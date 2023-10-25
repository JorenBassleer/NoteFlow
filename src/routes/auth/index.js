export default [
  {
    path: '/login',
    component: () => import('../../views/auth/LoginPage.vue'),
  },
  {
    path: '/register',
    component: () => import('../../views/auth/RegisterPage.vue'),
  },
];
