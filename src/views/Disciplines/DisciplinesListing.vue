<template>
  <CardLayout>
    <template #v-toolbar>
      <v-toolbar-title>
        Disciplinas
      </v-toolbar-title>
    </template>
    <template #v-card-text>
      <DataTable
        :headers="headers"
        :items="items"
        :message-when-no-records="messageWhenNoRecords"
        route-path="/disciplines"
        @destroy="deleteDiscipline"
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
  name: 'DisciplinesListing',
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
        value: 'actions',
        sortable: false,
        align: 'right',
      },
    ],
    items: [],
    messageWhenNoRecords: 'Não existe nenhuma disciplina cadastrada',
  }),
  async created() {
    this.getDisciplines();
  },
  methods: {
    ...mapMutations(['HANDLE_SNACKBAR']),
    async getDisciplines() {
      try {
        const disciplines = await api.get('/disciplines');

        disciplines.forEach((discipline) => this.items.push({
          id: discipline.id,
          discipline: discipline.title,
        }));
      } catch (error) {
        this.HANDLE_SNACKBAR({ show: true, text: error });
      }
    },
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
  },
};
</script>
