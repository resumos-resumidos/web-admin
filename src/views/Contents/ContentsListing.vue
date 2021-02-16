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
  name: 'ContentsListing',
  components: {
    CrudTable,
  },
  data: () => ({
    headers: [
      'Disciplina',
      'Contéudo',
    ],
    messageWhenNoRecords: 'Não existe nenhum contéudo cadastrado',
    rows: [],
  }),
  async created() {
    this.getContents();
  },
  methods: {
    ...mapMutations(['HANDLE_SNACKBAR']),
    async getContents() {
      try {
        const contents = await api.get('/contents');

        contents.forEach((content) => this.rows.push({
          id: content.id,
          columns: [
            content.discipline.title,
            content.title,
          ],
        }));
      } catch (error) {
        this.HANDLE_SNACKBAR({ show: true, text: error });
      }
    },
  },
};
</script>
