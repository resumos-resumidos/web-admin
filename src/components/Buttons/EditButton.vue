<template>
  <v-btn
    icon
    :to="`${this.$route.path}/edit/${id}`"
  >
    <v-icon>
      mdi-pencil
    </v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'EditButton',
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
};
</script>
