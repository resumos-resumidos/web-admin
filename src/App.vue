<template>
  <v-app>
    <SideMenu />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import SideMenu from './components/SideMenu.vue';

export default {
  name: 'App',
  components: {
    SideMenu,
  },
};
</script>
