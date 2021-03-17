<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th
            v-for="(header, headerIndex) in headers"
            :key="headerIndex"
          >
            {{ header }}
          </th>
          <th class="text-right">
            <v-btn
              icon
              :to="`${routePath}/create`"
            >
              <v-icon>
                mdi-plus-circle-outline
              </v-icon>
            </v-btn>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, rowIndex) in rows"
          :key="rowIndex"
        >
          <td
            v-for="(column, columnIndex) in row.columns"
            :key="columnIndex"
          >
            {{ column }}
          </td>
          <td class="text-right">
            <v-btn
              icon
              :to="`${routePath}/edit/${row.id}`"
            >
              <v-icon>
                mdi-pencil
              </v-icon>
            </v-btn>
            <v-btn
              icon
              @click="$emit('destroy', row.id)"
            >
              <v-icon>
                mdi-delete
              </v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
      <tfoot v-if="rows.length === 0">
        <tr class="text-center font-weight-light">
          <td :colspan="headers.length + 1">
            {{ messageWhenNoRecords }}
          </td>
        </tr>
      </tfoot>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  name: 'CrudTable',
  props: {
    headers: {
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
    rows: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
/* Remove hover da tabela */
.v-data-table >
.v-data-table__wrapper >
table >
tbody >
tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
  background: initial !important;
}

/* Garante que as colunas da tabela não vão quebrar o conteúdo em mais de uma linha */
.v-data-table > .v-data-table__wrapper > table > thead > tr > th,
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td {
  white-space: nowrap;
}
</style>
