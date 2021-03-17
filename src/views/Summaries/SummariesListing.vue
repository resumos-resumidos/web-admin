<template>
  <CardLayout>
    <template #v-toolbar>
      <v-toolbar-title>
        Resumos
      </v-toolbar-title>
    </template>
    <template #v-card-text>
      <DataTable
        :headers="headers"
        :items="items"
        :message-when-no-records="messageWhenNoRecords"
        route-path="/summaries"
        @destroy="deleteSummary"
      />
    </template>
  </CardLayout>
</template>

<script>
import { mapMutations } from 'vuex';

import CardLayout from '../../components/Layouts/CardLayout.vue';
import DataTable from '../../components/Tables/DataTable.vue';

import api from '../../services/api';

export default {
  name: 'SummariesListing',
  components: {
    CardLayout,
    DataTable,
  },
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
        text: 'Gratuito',
        value: 'free',
      },
      {
        value: 'actions',
        sortable: false,
        align: 'right',
      },
    ],
    items: [],
    messageWhenNoRecords: 'Não existe nenhum resumo cadastrado',
  }),
  async created() {
    this.getSummaries();
  },
  methods: {
    ...mapMutations(['HANDLE_SNACKBAR']),
    async getSummaries() {
      try {
        const summaries = await api.get('/summaries');

        summaries.forEach((summary) => this.items.push({
          id: summary.id,
          discipline: summary.content.discipline.title,
          content: summary.content.title,
          summary: summary.title,
          free: summary.free ? 'Sim' : 'Não',
        }));
      } catch (error) {
        this.HANDLE_SNACKBAR({ show: true, text: error });
      }
    },
    async deleteSummary(summaryId) {
      try {
        if (window.confirm('Tem certeza que deseja excluir este resumo?')) {
          await api.delete(`/summaries/${summaryId}`);
          this.items = this.items.filter((item) => item.id !== summaryId);
        }
      } catch (error) {
        this.HANDLE_SNACKBAR({ show: true, text: error });
      }
    },
  },
};
</script>
