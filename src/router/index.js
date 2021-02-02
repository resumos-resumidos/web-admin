import Vue from 'vue';
import VueRouter from 'vue-router';

import Disciplines from '../views/Disciplines.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/disciplines',
    name: 'disciplines',
    component: Disciplines,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
