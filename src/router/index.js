// import { createRouter, createWebHistory } from "vue-router";
// import HomeView from "@/views/HomeView.vue";
// import DataView from "@/views/DataView.vue";
// import LoginView from "@/views/LoginView.vue";
// import RegisterView from "@/views/Signup.vue";
// import NotFoundView from "@/views/NotFoundView.vue";

// const router = createRouter({
//     history: createWebHistory(import.meta.env.BASE_URL),
//     routes: [
//         {
//             path: '/',
//             name: 'home',
//             component: 'HomeView',
//         },
//         {
//             path: '/:catchAll(.*)',
//             name: 'not-found',
//             component: NotFoundView,
//         },
//     ]
// });

// export default router;

import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import Signup from '@/views/Signup.vue';
import Login from '@/views/LoginView.vue';
import first from '@/App.vue';

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/signup', name: 'signup', component: Signup },
  { path: '/login', name: 'login', component: Login },
  { path: '/home', name: 'home', component: HomeView },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// Navigation guard to check for authentication
router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/signup'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('username');

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
});

export default router;
