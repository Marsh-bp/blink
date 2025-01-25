

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
