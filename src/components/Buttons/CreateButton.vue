<template>
  <v-btn
    icon
    :to="`${this.$route.path}/create`"
  >
    <v-icon>
      mdi-plus-circle-outline
    </v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'CreateButton',
};
</script>
