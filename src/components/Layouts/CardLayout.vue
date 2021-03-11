<template>
  <v-card class="elevation-12">
    <v-toolbar flat>
      <slot name="v-toolbar" />
    </v-toolbar>
    <v-card-text>
      <slot name="v-card-text" />
    </v-card-text>
    <v-card-actions>
      <slot name="v-card-actions" />
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'CardLayout',
};
</script>
