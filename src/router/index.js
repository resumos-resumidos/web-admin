import Vue from 'vue';
import VueRouter from 'vue-router';

import Contents from '../views/Contents/Contents.vue';
import ContentsCreate from '../views/Contents/ContentsCreate.vue';
import ContentsEdit from '../views/Contents/ContentsEdit.vue';
import ContentsListing from '../views/Contents/ContentsListing.vue';
import Disciplines from '../views/Disciplines/Disciplines.vue';
import DisciplinesForm from '../views/Disciplines/DisciplinesForm.vue';
import DisciplinesListing from '../views/Disciplines/DisciplinesListing.vue';
import Summaries from '../views/Summaries/Summaries.vue';
import SummariesCreate from '../views/Summaries/SummariesCreate.vue';
import SummariesEdit from '../views/Summaries/SummariesEdit.vue';
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
        component: ContentsCreate,
      },
      {
        path: 'edit/:id',
        component: ContentsEdit,
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
        component: SummariesCreate,
      },
      {
        path: 'edit/:id',
        component: SummariesEdit,
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
