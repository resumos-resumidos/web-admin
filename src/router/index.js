import Vue from 'vue';
import VueRouter from 'vue-router';

import Contents from '../views/Contents/Contents.vue';
import ContentsForm from '../views/Contents/ContentsForm.vue';
import ContentsListing from '../views/Contents/ContentsListing.vue';
import Disciplines from '../views/Disciplines/Disciplines.vue';
import DisciplinesForm from '../views/Disciplines/DisciplinesForm.vue';
import DisciplinesListing from '../views/Disciplines/DisciplinesListing.vue';
import Summaries from '../views/Summaries/Summaries.vue';
import SummariesForm from '../views/Summaries/SummariesForm.vue';
import SummariesListing from '../views/Summaries/SummariesListing.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/disciplines',
    component: Disciplines,
    children: [
      {
        path: '',
        component: DisciplinesListing,
      },
      {
        path: 'create',
        component: DisciplinesForm,
      },
      {
        path: 'edit/:id',
        component: DisciplinesForm,
      },
    ],
  },
  {
    path: '/contents',
    component: Contents,
    children: [
      {
        path: '',
        component: ContentsListing,
      },
      {
        path: 'create',
        component: ContentsForm,
      },
      {
        path: 'edit/:id',
        component: ContentsForm,
      },
    ],
  },
  {
    path: '/summaries',
    component: Summaries,
    children: [
      {
        path: '',
        component: SummariesListing,
      },
      {
        path: 'create',
        component: SummariesForm,
      },
      {
        path: 'edit/:id',
        component: SummariesForm,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
