<template>
  <CardLayout>
    <template #v-toolbar>
      <v-toolbar-title>
        Resumos
      </v-toolbar-title>
    </template>
    <template #v-card-text>
      <CrudTable
        :headers="headers"
        :message-when-no-records="messageWhenNoRecords"
        route-path="/summaries"
        :rows="rows"
        @destroy="deleteSummary"
      />
    </template>
  </CardLayout>
</template>

<script>
import { mapMutations } from 'vuex';

import CardLayout from '../../components/Layouts/CardLayout.vue';
import CrudTable from '../../components/Tables/CrudTable.vue';

import api from '../../services/api';

export default {
  name: 'SummariesListing',
  components: {
    CardLayout,
    CrudTable,
  },
  data: () => ({
    headers: [
      'Disciplina',
      'Contéudo',
      'Resumo',
      'Gratuito',
    ],
    messageWhenNoRecords: 'Não existe nenhum resumo cadastrado',
    rows: [],
  }),
  async created() {
    this.getSummaries();
  },
  methods: {
    ...mapMutations(['HANDLE_SNACKBAR']),
    async getSummaries() {
      try {
        const summaries = await api.get('/summaries');

        summaries.forEach((summary) => this.rows.push({
          id: summary.id,
          columns: [
            summary.content.discipline.title,
            summary.content.title,
            summary.title,
            summary.free ? 'Sim' : 'Não',
          ],
        }));
      } catch (error) {
        this.HANDLE_SNACKBAR({ show: true, text: error });
      }
    },
    async deleteSummary(summaryId) {
      try {
        if (window.confirm('Tem certeza que deseja excluir este resumo?')) {
          await api.delete(`/summaries/${summaryId}`);
          this.rows = this.rows.filter((row) => row.id !== summaryId);
        }
      } catch (error) {
        this.HANDLE_SNACKBAR({ show: true, text: error });
      }
    },
  },
};
</script>
