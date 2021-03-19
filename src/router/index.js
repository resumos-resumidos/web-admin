import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from '../views/Auth/Login.vue';
import Contents from '../views/Contents/Contents.vue';
import ContentsForm from '../views/Contents/ContentsForm.vue';
import ContentsListing from '../views/Contents/ContentsListing.vue';
import Disciplines from '../views/Disciplines/Disciplines.vue';
import DisciplinesForm from '../views/Disciplines/DisciplinesForm.vue';
import DisciplinesListing from '../views/Disciplines/DisciplinesListing.vue';
import Home from '../views/Home.vue';
import Summaries from '../views/Summaries/Summaries.vue';
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
    children: [
      {
        component: DisciplinesListing,
        path: '',
      },
      {
        component: DisciplinesForm,
        path: 'create',
      },
      {
        component: DisciplinesForm,
        path: 'edit/:id',
      },
    ],
    component: Disciplines,
    path: '/disciplines',
  },
  {
    children: [
      {
        component: ContentsListing,
        path: '',
      },
      {
        component: ContentsForm,
        path: 'create',
      },
      {
        component: ContentsForm,
        path: 'edit/:id',
      },
    ],
    component: Contents,
    path: '/contents',
  },
  {
    children: [
      {
        component: SummariesListing,
        path: '',
      },
      {
        component: SummariesForm,
        path: 'create',
      },
      {
        component: SummariesForm,
        path: 'edit/:id',
      },
    ],
    component: Summaries,
    path: '/summaries',
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  mode: 'history',
  routes,
});

export default router;
