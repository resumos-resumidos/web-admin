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
            <v-card class="elevation-12">
              <v-toolbar flat>
                <v-toolbar-title>
                  {{ title }}
                </v-toolbar-title>
              </v-toolbar>
              <slot />
            </v-card>
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
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>
