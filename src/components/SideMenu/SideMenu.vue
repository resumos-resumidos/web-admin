<template>
  <div>
    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click="drawer = !drawer" />

      <v-toolbar-title>
        <router-link
          class="toolbar-title"
          to="/"
        >
          Resumos Resumidos
        </router-link>
      </v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="title">
              Bem vindo
            </v-list-item-title>
            <v-list-item-subtitle>
              Nome do usuário
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider />

      <v-list dense>
        <SideMenuItem
          icon="mdi-arrow-right"
          title="Disciplinas"
          to="/disciplines"
        />
        <SideMenuItem
          icon="mdi-arrow-right"
          title="Contéudos"
          to="/contents"
        />
        <SideMenuItem
          icon="mdi-arrow-right"
          title="Resumos"
          to="/summaries"
        />
      </v-list>

      <v-divider />

      <v-list dense>
        <SideMenuItem
          icon="mdi-logout-variant"
          title="Sair"
          @click="logout"
        />
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

import SideMenuItem from './SideMenuItem.vue';

import request from '../../mixins/request';

export default {
  name: 'SideMenu',
  components: {
    SideMenuItem,
  },
  mixins: [request],
  data: () => ({ drawer: null }),
  methods: {
    ...mapActions(['getAccessToken']),
    async logout() {
      const response = await this.request('post', '/auth/logout');

      if (response) {
        localStorage.removeItem('accessToken');
        await this.getAccessToken();
        this.$router.push('/login');
      }
    },
  },
};
</script>

<style scoped>
.toolbar-title {
  color: inherit;
  text-decoration: inherit;
}
</style>
