import Vue from 'vue';
import VueRouter from 'vue-router';

import Disciplines from '../views/Disciplines/Disciplines.vue';
import DisciplinesCreate from '../views/Disciplines/DisciplinesCreate.vue';
import DisciplinesEdit from '../views/Disciplines/DisciplinesEdit.vue';
import DisciplinesListing from '../views/Disciplines/DisciplinesListing.vue';

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
        component: DisciplinesCreate,
      },
      {
        path: 'edit/:id',
        component: DisciplinesEdit,
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
