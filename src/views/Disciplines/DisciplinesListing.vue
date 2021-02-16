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
  name: 'DisciplinesListing',
  components: {
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
  },
};
</script>
