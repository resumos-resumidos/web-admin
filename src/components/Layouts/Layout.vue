<template>
  <v-app>
    <Snackbar />
    <slot />
  </v-app>
</template>

<script>
import Snackbar from '../Utils/Snackbar.vue';

export default {
  name: 'Layout',
  components: {
    Snackbar,
  },
};
</script>
