<template>
  <Layout>
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
                <v-spacer v-if="showBackButton" />
                <v-btn
                  v-if="showBackButton"
                  text
                  color="primary"
                  @click="$router.push(routePath)"
                >
                  Voltar
                </v-btn>
              </v-toolbar>
              <slot />
            </v-card>
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
  props: {
    routePath: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  computed: {
    showBackButton() {
      return this.$route.path !== this.routePath;
    },
  },
};
</script>
