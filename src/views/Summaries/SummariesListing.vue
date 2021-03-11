<template>
  <CardLayout>
    <template #v-toolbar>
      <v-toolbar-title>
        Resumos
      </v-toolbar-title>
    </template>
    <template #v-card-text>
      <CrudTable
        :columns="columns"
        :headers="headers"
        :message-when-no-records="messageWhenNoRecords"
        route-path="/summaries"
      />
    </template>
  </CardLayout>
</template>

<script>
import CardLayout from '../../components/Layouts/CardLayout.vue';
import CrudTable from '../../components/Tables/CrudTable.vue';

export default {
  name: 'SummariesListing',
  components: {
    CardLayout,
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
