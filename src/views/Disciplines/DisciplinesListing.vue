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
    headers: ['Título'],
    messageWhenNoRecords: 'Não existe nenhuma disciplina cadastrada',
    rows: [],
  }),
  async created() {
    try {
      const disciplines = await api.get('/disciplines');

      disciplines.forEach(({ id, title }) => this.rows.push({ id, columns: [title] }));
    } catch (error) {
      this.HANDLE_SNACKBAR({ show: true, text: error });
    }
  },
  methods: {
    ...mapMutations(['HANDLE_SNACKBAR']),
  },
};
</script>
