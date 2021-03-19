<template>
  <v-data-table
    :footer-props="{
      itemsPerPageText: 'Registros por página:',
      itemsPerPageOptions: [5, 10, 25],
    }"
    :header-props="{
      sortByText: 'Ordenar por',
    }"
    :headers="[...headers, {
      value: 'actions',
      sortable: false,
      align: 'right',
    }]"
    :items="items"
    :items-per-page="5"
    :no-data-text="messageWhenNoRecords"
    :sort-by="sortBy"
  >
    <template v-slot:[`item.actions`]="{ item }">
      <v-btn
        icon
        :to="`${routePath}/edit/${item.id}`"
      >
        <v-icon>
          mdi-pencil
        </v-icon>
      </v-btn>
      <v-btn
        icon
        @click="$emit('destroy', item.id)"
      >
        <v-icon>
          mdi-delete
        </v-icon>
      </v-btn>
    </template>
    <template v-slot:[`footer.page-text`]="props">
      {{ props.pageStart }}-{{ props.pageStop }} de {{ props.itemsLength }}
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'DataTable',
  props: {
    headers: {
      type: Array,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    messageWhenNoRecords: {
      type: String,
      required: true,
    },
    routePath: {
      type: String,
      required: true,
    },
    sortBy: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
