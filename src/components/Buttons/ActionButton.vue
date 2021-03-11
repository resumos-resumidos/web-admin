<template>
  <v-btn
    text
    color="primary"
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
