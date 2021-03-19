<template>
  <v-btn
    color="primary"
    text
    @click="$emit('action')"
  >
    {{ label }}
  </v-btn>
</template>

<script>
export default {
  name: 'ActionButton',
  props: {
    label: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>

</style>
