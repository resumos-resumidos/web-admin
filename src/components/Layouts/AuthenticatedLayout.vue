<template>
  <Layout>
    <SideMenu />
    <v-main>
      <v-container fluid>
        <v-row
          justify="center"
          no-gutters
        >
          <v-col cols="12">
            <slot />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </Layout>
</template>

<script>
import SideMenu from '../SideMenu/SideMenu.vue';
import Layout from './Layout.vue';

export default {
  name: 'AuthenticatedLayout',
  components: {
    Layout,
    SideMenu,
  },
};
</script>
