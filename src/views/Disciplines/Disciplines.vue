<template>
  <AuthenticatedLayout>
    <h2 class="mb-3">
      Disciplinas
    </h2>
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
