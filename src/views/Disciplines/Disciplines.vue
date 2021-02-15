<template>
  <AuthenticatedLayout
    title="Disciplinas"
    route-path="/disciplines"
  >
    <router-view />
  </AuthenticatedLayout>
</template>

<script>
import AuthenticatedLayout from '../../components/Layouts/AuthenticatedLayout.vue';

export default {
  name: 'Disciplines',
  components: {
    AuthenticatedLayout,
  },
};
</script>
