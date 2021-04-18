<template>
  <AuthenticatedLayout>
    <CardLayout>
      <template #toolbar>
        <v-toolbar-title>
          Resumos
        </v-toolbar-title>
        <v-spacer />
        <RouteButton
          label="Adicionar"
          route-path="/summaries/create"
        />
      </template>
      <template #cardText>
        <DataTable
          :headers="headers"
          :items="items"
          :message-when-no-records="messageWhenNoRecords"
          route-path="/summaries"
          :sort-by="['summary']"
          @destroy="deleteSummary"
        />
      </template>
    </CardLayout>
  </AuthenticatedLayout>
</template>

<script>
import RouteButton from '../../components/Buttons/RouteButton.vue';
import AuthenticatedLayout from '../../components/Layouts/AuthenticatedLayout.vue';
import CardLayout from '../../components/Layouts/CardLayout.vue';
import DataTable from '../../components/Tables/DataTable.vue';

import request from '../../mixins/request';

export default {
  name: 'SummariesListing',
  components: {
    AuthenticatedLayout,
    CardLayout,
    DataTable,
    RouteButton,
  },
  mixins: [request],
  data: () => ({
    headers: [
      {
        text: 'Disciplina',
        value: 'discipline',
      },
      {
        text: 'Contéudo',
        value: 'content',
      },
      {
        text: 'Resumo',
        value: 'summary',
      },
      {
        text: 'Slug',
        value: 'slug',
      },
      {
        text: 'Gratuito',
        value: 'free',
      },
    ],
    items: [],
    messageWhenNoRecords: 'Não existe nenhum resumo cadastrado',
  }),
  async created() {
    this.getSummaries();
  },
  methods: {
    async deleteSummary(slug) {
      if (window.confirm('Tem certeza que deseja excluir este resumo?')) {
        const response = await this.request('delete', `/summaries/${slug}`);

        if (response) {
          this.items = this.items.filter((item) => item.slug !== slug);
        }
      }
    },
    async getSummaries() {
      const summaries = await this.request('get', '/summaries');

      if (summaries) {
        summaries.forEach((summary) => this.items.push({
          content: summary.content.title,
          discipline: summary.content.discipline.title,
          free: summary.free ? 'Sim' : 'Não',
          slug: summary.slug,
          summary: summary.title,
        }));
      }
    },
  },
};
</script>
