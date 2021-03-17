<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :items-per-page="5"
    :no-data-text="messageWhenNoRecords"
    :sort-by="sortBy"
  >
    <template v-slot:[`header.actions`]>
      <v-btn
        icon
        :to="`${routePath}/create`"
      >
        <v-icon>
          mdi-plus-circle-outline
        </v-icon>
      </v-btn>
    </template>
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
