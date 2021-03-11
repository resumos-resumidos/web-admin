<template>
  <AuthenticatedLayout>
    <h1>Home</h1>
  </AuthenticatedLayout>
</template>

<script>
import AuthenticatedLayout from '../components/Layouts/AuthenticatedLayout.vue';

export default {
  name: 'Home',
  components: {
    AuthenticatedLayout,
  },
};
</script>
