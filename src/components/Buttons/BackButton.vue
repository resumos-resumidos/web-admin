<template>
  <v-btn
    text
    color="primary"
    @click="$router.push(routePath)"
  >
    Voltar
  </v-btn>
</template>

<script>
export default {
  name: 'BackButton',
  props: {
    routePath: {
      type: String,
      required: true,
    },
  },
};
</script>
