<template>
  <CardLayout>
    <template #v-toolbar>
      <v-toolbar-title>
        Disciplinas
      </v-toolbar-title>
    </template>
    <template #v-card-text>
      <CrudTable
        :headers="headers"
        :message-when-no-records="messageWhenNoRecords"
        route-path="/disciplines"
        :rows="rows"
        @destroy="deleteDiscipline"
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
  name: 'DisciplinesListing',
  components: {
    CardLayout,
    CrudTable,
  },
  data: () => ({
    headers: [
      'Disciplina',
    ],
    messageWhenNoRecords: 'Não existe nenhuma disciplina cadastrada',
    rows: [],
  }),
  async created() {
    this.getDisciplines();
  },
  methods: {
    ...mapMutations(['HANDLE_SNACKBAR']),
    async getDisciplines() {
      try {
        const disciplines = await api.get('/disciplines');

        disciplines.forEach((discipline) => this.rows.push({
          id: discipline.id,
          columns: [
            discipline.title,
          ],
        }));
      } catch (error) {
        this.HANDLE_SNACKBAR({ show: true, text: error });
      }
    },
    async deleteDiscipline(disciplineId) {
      try {
        if (window.confirm('Tem certeza que deseja excluir esta disciplina?')) {
          await api.delete(`/disciplines/${disciplineId}`);
          this.rows = this.rows.filter((row) => row.id !== disciplineId);
        }
      } catch (error) {
        this.HANDLE_SNACKBAR({ show: true, text: error });
      }
    },
  },
};
</script>
