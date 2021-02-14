<template>
  <v-btn
    icon
    @click="$emit('destroy', id)"
  >
    <v-icon>
      mdi-delete
    </v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'DeleteButton',
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
};
</script>
