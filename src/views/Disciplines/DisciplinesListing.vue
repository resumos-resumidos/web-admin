<template>
  <CardLayout>
    <template #v-toolbar>
      <v-toolbar-title>
        Disciplinas
      </v-toolbar-title>
    </template>
    <template #v-card-text>
      <CrudTable
        :columns="columns"
        :headers="headers"
        :message-when-no-records="messageWhenNoRecords"
        route-path="/disciplines"
      />
    </template>
  </CardLayout>
</template>

<script>
import CardLayout from '../../components/Layouts/CardLayout.vue';
import CrudTable from '../../components/Tables/CrudTable.vue';

export default {
  name: 'DisciplinesListing',
  components: {
    CardLayout,
    CrudTable,
  },
  data: () => ({
    columns: [
      'title',
    ],
    headers: [
      'Disciplina',
    ],
    messageWhenNoRecords: 'Não existe nenhuma disciplina cadastrada',
  }),
};
</script>
