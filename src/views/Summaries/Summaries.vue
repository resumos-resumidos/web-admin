<template>
  <AuthenticatedLayout
    title="Resumos"
    route-path="/summaries"
  >
    <router-view />
  </AuthenticatedLayout>
</template>

<script>
import AuthenticatedLayout from '../../components/Layouts/AuthenticatedLayout.vue';

export default {
  name: 'Summaries',
  components: {
    AuthenticatedLayout,
  },
};
</script>
