<template>
  <AuthenticatedLayout>
    <v-row>
      <v-col
        v-for="(card, index) in cards"
        :key="index"
        cols="12"
        md="4"
      >
        <CardLayout :loading="loading">
          <template #toolbar>
            <v-toolbar-title>
              {{ card.title }}
            </v-toolbar-title>
          </template>
          <template #cardText>
            <v-skeleton-loader
              v-if="loading"
              type="heading"
            />
            <span
              v-else
              class="headline font-weight-bold"
            >
              {{ card.text }}
            </span>
          </template>
          <template #cardActions>
            <RouteButton
              :disabled="loading"
              label="Visualizar"
              :route-path="card.routePath"
            />
          </template>
        </CardLayout>
      </v-col>
    </v-row>
  </AuthenticatedLayout>
</template>

<script>
import { mapMutations } from 'vuex';

import RouteButton from '../../components/Buttons/RouteButton.vue';
import AuthenticatedLayout from '../../components/Layouts/AuthenticatedLayout.vue';
import CardLayout from '../../components/Layouts/CardLayout.vue';

import api from '../../services/api';

export default {
  name: 'Home',
  components: {
    AuthenticatedLayout,
    CardLayout,
    RouteButton,
  },
  data: () => ({
    cards: [
      {
        recordCount: 'disciplinesCount',
        routePath: '/disciplines',
        text: 'Existem :disciplinesCount disciplinas cadastradas',
        title: 'Disciplinas',
      },
      {
        recordCount: 'contentsCount',
        routePath: '/contents',
        text: 'Existem :contentsCount contéudos cadastrados',
        title: 'Contéudos',
      },
      {
        recordCount: 'summariesCount',
        routePath: '/summaries',
        text: 'Existem :summariesCount resumos cadastrados',
        title: 'Resumos',
      },
    ],
    loading: true,
  }),
  created() {
    this.getRecordsCount();
  },
  methods: {
    ...mapMutations(['HANDLE_SNACKBAR']),
    async getRecordsCount() {
      try {
        const recordsCount = await api.get('/home');

        this.cards = this.cards.map(({ text, recordCount, ...card }) => ({
          text: text.replace(`:${recordCount}`, recordsCount[recordCount]),
          ...card,
        }));

        this.loading = false;
      } catch (error) {
        this.HANDLE_SNACKBAR({ show: true, text: error });
      }
    },
  },
};
</script>
