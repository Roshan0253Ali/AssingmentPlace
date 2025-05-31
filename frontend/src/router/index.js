import { createRouter, createWebHistory } from 'vue-router';
import SignupView from '../views/SignupView.vue';
import LoginView from '../views/LoginView.vue';
import DashboardView from '../views/DashboardView.vue';

const routes = [
  { path: '/', redirect: '/signup' },
  { path: '/signup', component: SignupView },
  { path: '/login', component: LoginView },
  { path: '/dashboard', component: DashboardView }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
