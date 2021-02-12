<template>
  <v-snackbar
    v-model="show"
    :timeout="2000"
  >
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn
        text
        v-bind="attrs"
        @click="CLOSE_SNACKBAR"
      >
        Fechar
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'Snackbar',
  computed: {
    ...mapState(['snackbar']),
    show: {
      get() {
        return this.snackbar.show;
      },
      set(newValue) {
        if (newValue === false) {
          this.CLOSE_SNACKBAR();
        }
      },
    },
    text() {
      return this.snackbar.text;
    },
  },
  methods: {
    ...mapMutations(['CLOSE_SNACKBAR']),
  },
};
</script>

<style></style>
