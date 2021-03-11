<template>
  <Layout>
    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="6"
            lg="4"
          >
            <slot />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </Layout>
</template>

<script>
import Layout from './Layout.vue';

export default {
  name: 'GuestLayout',
  components: {
    Layout,
  },
};
</script>
