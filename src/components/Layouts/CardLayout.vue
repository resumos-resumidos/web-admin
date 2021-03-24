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
    <v-card-actions>
      <slot name="cardActions" />
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'CardLayout',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
