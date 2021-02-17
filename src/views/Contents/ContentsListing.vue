<template>
  <v-card-text>
    <CrudTable
      :columns="columns"
      :headers="headers"
      :message-when-no-records="messageWhenNoRecords"
      route-path="/contents"
    />
  </v-card-text>
</template>

<script>
import CrudTable from '../../components/Tables/CrudTable.vue';

export default {
  name: 'ContentsListing',
  components: {
    CrudTable,
  },
  data: () => ({
    columns: [
      'discipline.title',
      'title',
    ],
    headers: [
      'Disciplina',
      'Contéudo',
    ],
    messageWhenNoRecords: 'Não existe nenhum contéudo cadastrado',
  }),
};
</script>
