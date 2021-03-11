<template>
  <AuthenticatedLayout>
    <router-view />
  </AuthenticatedLayout>
</template>

<script>
import AuthenticatedLayout from '../../components/Layouts/AuthenticatedLayout.vue';

export default {
  name: 'Contents',
  components: {
    AuthenticatedLayout,
  },
};
</script>
