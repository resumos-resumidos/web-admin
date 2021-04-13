<template>
  <AuthenticatedLayout>
    <CardLayout>
      <template #toolbar>
        <v-toolbar-title>
          Contéudos
        </v-toolbar-title>
        <v-spacer />
        <RouteButton
          label="Adicionar"
          route-path="/contents/create"
        />
      </template>
      <template #cardText>
        <DataTable
          :headers="headers"
          :items="items"
          :loading="loading"
          :message-when-no-records="messageWhenNoRecords"
          route-path="/contents"
          :sort-by="['content']"
          @destroy="deleteContent"
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
  name: 'ContentsListing',
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
        text: 'Slug',
        value: 'slug',
      },
    ],
    items: [],
    loading: true,
    messageWhenNoRecords: 'Não existe nenhum contéudo cadastrado',
  }),
  async created() {
    this.getContents();
  },
  methods: {
    async deleteContent(slug) {
      if (window.confirm('Tem certeza que deseja excluir este conteúdo?')) {
        const response = await this.request('delete', `/contents/${slug}`);

        if (response) {
          this.items = this.items.filter((item) => item.slug !== slug);
        }
      }
    },
    async getContents() {
      const contents = await this.request('get', '/contents');

      if (contents) {
        contents.forEach((content) => this.items.push({
          content: content.title,
          discipline: content.discipline.title,
          slug: content.slug,
        }));

        this.loading = false;
      }
    },
  },
};
</script>
