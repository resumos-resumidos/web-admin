<template>
  <AuthenticatedLayout>
    <CardLayout>
      <template #toolbar>
        <v-toolbar-title>
          Disciplinas
        </v-toolbar-title>
        <v-spacer />
        <RouteButton
          label="Adicionar"
          route-path="/disciplines/create"
        />
      </template>
      <template #cardText>
        <DataTable
          :headers="headers"
          :items="items"
          :message-when-no-records="messageWhenNoRecords"
          route-path="/disciplines"
          :sort-by="['discipline']"
          @destroy="deleteDiscipline"
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
  name: 'DisciplinesListing',
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
        text: 'Slug',
        value: 'slug',
      },
    ],
    items: [],
    messageWhenNoRecords: 'Não existe nenhuma disciplina cadastrada',
  }),
  async created() {
    this.getDisciplines();
  },
  methods: {
    async deleteDiscipline(slug) {
      if (window.confirm('Tem certeza que deseja excluir esta disciplina?')) {
        const response = await this.request('delete', `/disciplines/${slug}`);

        if (response) {
          this.items = this.items.filter((item) => item.slug !== slug);
        }
      }
    },
    async getDisciplines() {
      const disciplines = await this.request('get', '/disciplines');

      if (disciplines) {
        disciplines.forEach((discipline) => this.items.push({
          discipline: discipline.title,
          slug: discipline.slug,
        }));
      }
    },
  },
};
</script>
