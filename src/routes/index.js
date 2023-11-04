export default [
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
];
