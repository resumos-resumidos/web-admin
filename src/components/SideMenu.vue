<template>
  <div>
    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click="drawer = !drawer" />

      <v-toolbar-title>
        Resumos Resumidos
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
        <ListItem
          icon="mdi-arrow-right"
          title="Disciplinas"
          to="/disciplines"
        />
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import ListItem from './ListItem.vue';

export default {
  name: 'SideMenu',
  components: {
    ListItem,
  },
  data: () => ({ drawer: false }),
};
</script>
