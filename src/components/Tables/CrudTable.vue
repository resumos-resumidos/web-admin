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
          v-for="({id, columns}, rowIndex) in rows"
          :key="rowIndex"
        >
          <td
            v-for="(column, columnIndex) in columns"
            :key="columnIndex"
          >
            {{ column }}
          </td>
          <td class="text-right">
            <EditButton :id="id" />
            <DeleteButton
              :id="id"
              @destroy="destroy"
            />
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
import { mapMutations } from 'vuex';

import CreateButton from '../Buttons/CreateButton.vue';
import DeleteButton from '../Buttons/DeleteButton.vue';
import EditButton from '../Buttons/EditButton.vue';

import api from '../../services/api';

export default {
  name: 'CrudTable',
  components: {
    CreateButton,
    DeleteButton,
    EditButton,
  },
  props: {
    tableHeaders: {
      type: Array,
      required: true,
    },
    messageWhenNoRecords: {
      type: String,
      required: true,
    },
    tableRows: {
      type: Array,
      required: true,
    },
  },
  computed: {
    headers() {
      return this.tableHeaders;
    },
    rows: {
      get() {
        return this.tableRows;
      },
      set(newValue) {
        this.$emit('update:table-rows', newValue);
      },
    },
  },
  methods: {
    ...mapMutations(['HANDLE_SNACKBAR']),
    async destroy(id) {
      try {
        if (window.confirm('Tem certeza que deseja excluir este registro?')) {
          await api.delete(`${this.$route.path}/${id}`);
          this.rows = this.rows.filter((row) => row.id !== id);
        }
      } catch (error) {
        this.HANDLE_SNACKBAR({ show: true, text: error });
      }
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
