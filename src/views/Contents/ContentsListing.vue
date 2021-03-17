<template>
  <CardLayout>
    <template #v-toolbar>
      <v-toolbar-title>
        Contéudos
      </v-toolbar-title>
    </template>
    <template #v-card-text>
      <CrudTable
        :headers="headers"
        :message-when-no-records="messageWhenNoRecords"
        route-path="/contents"
        :rows="rows"
        @destroy="deleteContent"
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
  name: 'ContentsListing',
  components: {
    CardLayout,
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
    async deleteContent(contentId) {
      try {
        if (window.confirm('Tem certeza que deseja excluir este conteúdo?')) {
          await api.delete(`/contents/${contentId}`);
          this.rows = this.rows.filter((row) => row.id !== contentId);
        }
      } catch (error) {
        this.HANDLE_SNACKBAR({ show: true, text: error });
      }
    },
  },
};
</script>
