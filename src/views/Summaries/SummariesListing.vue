<template>
  <v-card-text>
    <CrudTable
      :columns="columns"
      :headers="headers"
      :message-when-no-records="messageWhenNoRecords"
      route-path="/summaries"
    />
  </v-card-text>
</template>

<script>
import CrudTable from '../../components/Tables/CrudTable.vue';

export default {
  name: 'SummariesListing',
  components: {
    CrudTable,
  },
  data: () => ({
    columns: [
      'content.discipline.title',
      'content.title',
      'title',
      'free',
    ],
    headers: [
      'Disciplina',
      'Contéudo',
      'Resumo',
      'Gratuito',
    ],
    messageWhenNoRecords: 'Não existe nenhum resumo cadastrado',
  }),
};
</script>
