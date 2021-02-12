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
            <CreateButton />
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(columns, rowIndex) in rows"
          :key="rowIndex"
        >
          <td
            v-for="(column, columnIndex) in columns"
            :key="columnIndex"
          >
            {{ column }}
          </td>
          <td class="text-right">
            <EditButton />
            <DeleteButton />
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
import CreateButton from '../Buttons/CreateButton.vue';
import DeleteButton from '../Buttons/DeleteButton.vue';
import EditButton from '../Buttons/EditButton.vue';

export default {
  name: 'CrudTable',
  components: {
    CreateButton,
    DeleteButton,
    EditButton,
  },
  props: {
    headers: {
      type: Array,
      required: true,
    },
    messageWhenNoRecords: {
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
</style>
