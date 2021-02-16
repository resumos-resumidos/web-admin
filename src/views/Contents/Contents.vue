<template>
  <AuthenticatedLayout
    title="Contéudos"
    route-path="/contents"
  >
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
