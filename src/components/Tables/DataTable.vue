<template>
  <v-data-table
    :footer-props="footerProps"
    :header-props="headerProps"
    :headers="[...headers, actionsHeader]"
    :items="items"
    :items-per-page="5"
    :loading="loading"
    loading-text="Carregando..."
    :no-data-text="messageWhenNoRecords"
    :no-results-text="noResultsText"
    :search="search"
    :sort-by="sortBy"
  >
    <template v-slot:top>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        class="mb-2"
        hide-details
        label="Pesquisar"
        single-line
      />
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-btn
        icon
        :to="`${routePath}/edit/${item.slug}`"
      >
        <v-icon>
          mdi-pencil
        </v-icon>
      </v-btn>
      <v-btn
        icon
        @click="$emit('destroy', item.slug)"
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
    loading: {
      type: Boolean,
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
  data: () => ({
    actionsHeader: {
      align: 'right',
      sortable: false,
      value: 'actions',
    },
    footerProps: {
      itemsPerPageOptions: [5, 10, 25],
      itemsPerPageText: '',
    },
    headerProps: {
      sortByText: 'Ordenar por',
    },
    search: '',
  }),
  computed: {
    noResultsText() {
      return `Nenhum resultado encontrado para "${this.search}"`;
    },
  },
};
</script>
