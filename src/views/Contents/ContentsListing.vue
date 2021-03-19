<template>
  <CardLayout>
    <template #v-toolbar>
      <v-toolbar-title>
        Contéudos
      </v-toolbar-title>
      <v-spacer />
      <RouteButton
        label="Adicionar"
        route-path="/contents/create"
      />
    </template>
    <template #v-card-text>
      <DataTable
        :headers="headers"
        :items="items"
        :message-when-no-records="messageWhenNoRecords"
        route-path="/contents"
        :sort-by="['content']"
        @destroy="deleteContent"
      />
    </template>
  </CardLayout>
</template>

<script>
import { mapMutations } from 'vuex';

import RouteButton from '../../components/Buttons/RouteButton.vue';
import CardLayout from '../../components/Layouts/CardLayout.vue';
import DataTable from '../../components/Tables/DataTable.vue';

import api from '../../services/api';

export default {
  name: 'ContentsListing',
  components: {
    CardLayout,
    DataTable,
    RouteButton,
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
        value: 'actions',
        sortable: false,
        align: 'right',
      },
    ],
    items: [],
    messageWhenNoRecords: 'Não existe nenhum contéudo cadastrado',
  }),
  async created() {
    this.getContents();
  },
  methods: {
    ...mapMutations(['HANDLE_SNACKBAR']),
    async getContents() {
      try {
        const contents = await api.get('/contents');

        contents.forEach((content) => this.items.push({
          id: content.id,
          discipline: content.discipline.title,
          content: content.title,
        }));
      } catch (error) {
        this.HANDLE_SNACKBAR({ show: true, text: error });
      }
    },
    async deleteContent(contentId) {
      try {
        if (window.confirm('Tem certeza que deseja excluir este conteúdo?')) {
          await api.delete(`/contents/${contentId}`);
          this.items = this.items.filter((item) => item.id !== contentId);
        }
      } catch (error) {
        this.HANDLE_SNACKBAR({ show: true, text: error });
      }
    },
  },
};
</script>
