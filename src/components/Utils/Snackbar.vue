<template>
  <v-snackbar
    v-model="show"
    :timeout="3000"
  >
    {{ text }}
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
          this.SET_SNACKBAR({ show: false, text: null });
        }
      },
    },
    text() {
      return this.snackbar.text;
    },
  },
  methods: {
    ...mapMutations(['SET_SNACKBAR']),
  },
};
</script>

<style></style>
