<template>
  <CardLayout>
    <template #v-toolbar>
      <v-toolbar-title>
        Contéudos
      </v-toolbar-title>
    </template>
    <template #v-card-text>
      <CrudTable
        :columns="columns"
        :headers="headers"
        :message-when-no-records="messageWhenNoRecords"
        route-path="/contents"
      />
    </template>
  </CardLayout>
</template>

<script>
import CardLayout from '../../components/Layouts/CardLayout.vue';
import CrudTable from '../../components/Tables/CrudTable.vue';

export default {
  name: 'ContentsListing',
  components: {
    CardLayout,
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
