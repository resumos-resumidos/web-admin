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

import { verifyAccessToken } from '../services/accessToken';
import store from '../store';

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
  {
    path: '*',
    redirect: '/',
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  mode: 'history',
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.path !== '/login' && !store.state.accessToken) {
    const accessTokenIsValid = await verifyAccessToken();

    if (accessTokenIsValid) {
      store.dispatch('getAccessToken');
      next();
    } else {
      next({ path: '/login' });
    }
  } else {
    next();
  }
});

export default router;
