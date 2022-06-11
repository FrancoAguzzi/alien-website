import { createRouter, createWebHistory } from 'vue-router';
import createStore from '@/store';

const routes = [
  {
    path: '/captura',
    name: 'Captura',
    component: () => import(/* webpackChunkName: "Captura" */ '../views/Captura.vue'),
  },
  {
    path: '/obrigado',
    name: 'Obrigado',
    component: () => import(/* webpackChunkName: "Obrigado" */ '../views/Obrigado.vue'),
  },
  // {
  //   path: '/change-payment/:userID',
  //   name: 'ChangePayment',
  //   component: () => import(/* webpackChunkName: "ChangePayment" */ '../views/ChangePayment.vue'),
  //   meta: {
  //     public: true,
  //   },
  // },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "home" */ '../views/PageNotFound.vue'),
  },
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    props: true,
  },
  // {
  //   path: '/shop',
  //   name: 'Shop',
  //   component: () => import(/* webpackChunkName: "Shop" */ '../views/Shop.vue'),
  //   props: true,
  // },
  // {
  //   path: '/search',
  //   name: 'Search',
  //   component: () => import(/* webpackChunkName: "search" */ '../views/Search.vue'),
  //   props: true,
  // },
  // {
  //   path: '/my-profile/profile',
  //   name: 'Profile',
  //   component: () => import(/* webpackChunkName: "profile" */ '../views/MyProfile.vue'),
  // },
  // {
  //   path: '/my-profile/personal-data',
  //   name: 'PersonalData',
  //   component: () => import(/* webpackChunkName: "personaldata" */ '../views/PersonalData.vue'),
  // },
  // {
  //   path: '/my-profile/my-signature',
  //   name: 'MySignature',
  //   component: () => import(/* webpackChunkName: "mysignature" */ '../views/MySignature.vue'),
  //   props: true,
  // },
  // {
  //   path: '/my-profile/my-notifications',
  //   name: 'Notifications',
  //   component: () => import(/* webpackChunkName: "notifications" */ '../views/MyNotifications.vue'),
  // },
  // {
  //   path: '/help-center',
  //   name: 'HelpCenter',
  //   component: () => import(/* webpackChunkName: "helpcenter" */ '../views/HelpCenter.vue'),
  // },
  // {
  //   path: '/privacy-policy/:id?',
  //   name: 'PrivacyPolicy',
  //   component: () => import(/* webpackChunkName: "privacypolicy" */ '../views/PrivacyPolicy.vue'),
  //   meta: {
  //     public: true,
  //   },
  // },
  // {
  //   path: '/privacy-policy/:id?',
  //   name: 'PrivacyPolicyLogged',
  //   component: () => import(/* webpackChunkName: "privacypolicy" */ '../views/PrivacyPolicy.vue'),
  // },
  // {
  //   path: '/policy/:id?',
  //   name: 'Policy',
  //   component: () => import(/* webpackChunkName: "privacypolicy" */ '../views/PrivacyPolicy.vue'),
  // },
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  //   meta: {
  //     public: true,
  //   },
  //   props: true,
  // },
  // {
  //   path: '/complete-profile',
  //   name: 'CompleteProfile',
  //   component: () =>
  //     import(/* webpackChunkName: "complete-profile" */ '../views/CompleteProfile.vue'),
  //   meta: {
  //     public: true,
  //   },
  //   props: true,
  // },
  // {
  //   path: '/short-checkout/:userID?',
  //   name: 'ShortCheckout',
  //   component: () => import(/* webpackChunkName: "short-checkout" */ '../views/ShortCheckout.vue'),
  //   meta: {
  //     public: true,
  //   },
  // },
  // {
  //   path: '/forgot-password',
  //   name: 'ForgotPassword',
  //   component: () =>
  //     import(/* webpackChunkName: "passwordRecover" */ '../views/ForgotPassword.vue'),
  //   meta: {
  //     public: true,
  //   },
  //   props: true,
  // },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

router.beforeEach((to, from, next) => {
  // if (!to.meta.public && !createStore.state.token) {
  //   return next({ path: '/login' });
  // }
  if (to.meta.public && createStore.state.token) {
    return next({ path: '/' });
  }
  next();
});

export default router;
