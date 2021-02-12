<template>
  <v-app>
    <SideMenu />
    <v-main>
      <v-container fluid>
        <v-row
          no-gutters
          justify="center"
        >
          <v-col cols="12">
            <slot />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <Snackbar />
  </v-app>
</template>

<script>
import SideMenu from '../SideMenu/SideMenu.vue';
import Snackbar from '../Utils/Snackbar.vue';

export default {
  name: 'AuthenticatedLayout',
  components: {
    SideMenu,
    Snackbar,
  },
};
</script>
