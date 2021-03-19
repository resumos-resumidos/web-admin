<template>
  <v-btn
    text
    color="primary"
    @click="$router.push(routePath)"
  >
    {{ label }}
  </v-btn>
</template>

<script>
export default {
  name: 'RouteButton',
  props: {
    label: {
      type: String,
      required: true,
    },
    routePath: {
      type: String,
      required: true,
    },
  },
};
</script>
