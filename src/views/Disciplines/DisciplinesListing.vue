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
          :loading="loading"
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
import { mapMutations } from 'vuex';

import RouteButton from '../../components/Buttons/RouteButton.vue';
import AuthenticatedLayout from '../../components/Layouts/AuthenticatedLayout.vue';
import CardLayout from '../../components/Layouts/CardLayout.vue';
import DataTable from '../../components/Tables/DataTable.vue';

import api from '../../services/api';

export default {
  name: 'DisciplinesListing',
  components: {
    AuthenticatedLayout,
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
    ],
    items: [],
    loading: true,
    messageWhenNoRecords: 'Não existe nenhuma disciplina cadastrada',
  }),
  async created() {
    this.getDisciplines();
  },
  methods: {
    ...mapMutations(['HANDLE_SNACKBAR']),
    async deleteDiscipline(disciplineId) {
      try {
        if (window.confirm('Tem certeza que deseja excluir esta disciplina?')) {
          await api.delete(`/disciplines/${disciplineId}`);
          this.items = this.items.filter((item) => item.id !== disciplineId);
        }
      } catch (error) {
        this.HANDLE_SNACKBAR({ show: true, text: error });
      }
    },
    async getDisciplines() {
      try {
        const disciplines = await api.get('/disciplines');

        disciplines.forEach((discipline) => this.items.push({
          discipline: discipline.title,
          id: discipline.id,
        }));

        this.loading = false;
      } catch (error) {
        this.HANDLE_SNACKBAR({ show: true, text: error });
      }
    },
  },
};
</script>
