<template>
  <AuthenticatedLayout>
    <h2 class="mb-3">
      Disciplinas
    </h2>
    <CrudTable
      :headers="headers"
      :message-when-no-records="messageWhenNoRecords"
      :rows="rows"
    />
  </AuthenticatedLayout>
</template>

<script>
import { mapMutations } from 'vuex';

import AuthenticatedLayout from '../components/Layouts/AuthenticatedLayout.vue';
import CrudTable from '../components/Tables/CrudTable.vue';

import api from '../services/api';

export default {
  name: 'Disciplines',
  components: {
    AuthenticatedLayout,
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

      disciplines.forEach(({ title }) => this.rows.push([title]));
    } catch (error) {
      this.SHOW_SNACKBAR({ show: true, text: error });
    }
  },
  methods: {
    ...mapMutations(['SHOW_SNACKBAR']),
  },
};
</script>
