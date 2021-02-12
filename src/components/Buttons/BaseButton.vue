<template>
  <v-btn icon>
    <v-icon>
      {{ icon }}
    </v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>

</style>
