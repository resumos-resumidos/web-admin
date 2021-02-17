<template>
  <v-card-text>
    <CrudTable
      :columns="columns"
      :headers="headers"
      :message-when-no-records="messageWhenNoRecords"
      route-path="/disciplines"
    />
  </v-card-text>
</template>

<script>
import CrudTable from '../../components/Tables/CrudTable.vue';

export default {
  name: 'DisciplinesListing',
  components: {
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
