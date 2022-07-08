import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    alias: '/captura',
    name: 'Captura',
    component: () => import(/* webpackChunkName: "Captura" */ '../views/Captura.vue'),
  },
  {
    path: '/obrigado',
    name: 'Obrigado',
    component: () => import(/* webpackChunkName: "Obrigado" */ '../views/Obrigado.vue'),
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "home" */ '../views/PageNotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.public) {
    return next({ path: '/' });
  }
  next();
});

export default router;
