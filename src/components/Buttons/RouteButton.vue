<template>
  <v-btn
    color="primary"
    :disabled="disabled"
    text
    @click="$router.push(routePath)"
  >
    {{ label }}
  </v-btn>
</template>

<script>
export default {
  name: 'RouteButton',
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
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
