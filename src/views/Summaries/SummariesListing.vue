<template>
  <v-card-text>
    <CrudTable
      :table-headers="headers"
      :message-when-no-records="messageWhenNoRecords"
      :table-rows.sync="rows"
    />
  </v-card-text>
</template>

<script>
import { mapMutations } from 'vuex';

import CrudTable from '../../components/Tables/CrudTable.vue';

import api from '../../services/api';

export default {
  name: 'SummariesListing',
  components: {
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
  },
};
</script>
