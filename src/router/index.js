import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from '../views/Auth/Login.vue';
import ContentsForm from '../views/Contents/ContentsForm.vue';
import ContentsListing from '../views/Contents/ContentsListing.vue';
import DisciplinesForm from '../views/Disciplines/DisciplinesForm.vue';
import DisciplinesListing from '../views/Disciplines/DisciplinesListing.vue';
import Home from '../views/Home/Home.vue';
import SummariesForm from '../views/Summaries/SummariesForm.vue';
import SummariesListing from '../views/Summaries/SummariesListing.vue';

Vue.use(VueRouter);

const routes = [
  {
    component: Home,
    path: '/',
  },
  {
    component: Login,
    path: '/login',
  },
  {
    component: DisciplinesListing,
    path: '/disciplines',
  },
  {
    component: DisciplinesForm,
    path: '/disciplines/create',
  },
  {
    component: DisciplinesForm,
    path: '/disciplines/edit/:id',
  },
  {
    component: ContentsListing,
    path: '/contents',
  },
  {
    component: ContentsForm,
    path: '/contents/create',
  },
  {
    component: ContentsForm,
    path: '/contents/edit/:id',
  },
  {
    component: SummariesListing,
    path: '/summaries',
  },
  {
    component: SummariesForm,
    path: '/summaries/create',
  },
  {
    component: SummariesForm,
    path: '/summaries/edit/:id',
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  mode: 'history',
  routes,
});

export default router;
