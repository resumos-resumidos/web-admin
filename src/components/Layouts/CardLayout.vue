<template>
  <v-card
    class="elevation-12"
    :loading="loading"
  >
    <v-toolbar flat>
      <slot name="toolbar" />
    </v-toolbar>
    <v-card-text>
      <slot name="cardText" />
    </v-card-text>
    <template v-if="!!$slots.cardActions">
      <v-divider />
      <v-card-actions>
        <slot name="cardActions" />
      </v-card-actions>
    </template>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'CardLayout',
  computed: {
    ...mapState(['loading']),
  },
};
</script>
