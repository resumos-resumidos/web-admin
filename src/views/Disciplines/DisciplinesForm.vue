<template>
  <AuthenticatedLayout>
    <CardLayout>
      <template #toolbar>
        <v-toolbar-title>
          Disciplinas
        </v-toolbar-title>
        <v-spacer />
        <RouteButton
          label="Voltar"
          route-path="/disciplines"
        />
      </template>
      <template #cardText>
        <v-form @submit.prevent>
          <v-text-field
            v-model="title"
            :error-messages="errors.title"
            label="Disciplina"
            @focus="errors.title = null"
            @keydown.enter="saveDiscipline"
          />
        </v-form>
      </template>
      <template #cardActions>
        <ActionButton
          label="Salvar"
          @action="saveDiscipline"
        />
      </template>
    </CardLayout>
  </AuthenticatedLayout>
</template>

<script>
import ActionButton from '../../components/Buttons/ActionButton.vue';
import RouteButton from '../../components/Buttons/RouteButton.vue';
import AuthenticatedLayout from '../../components/Layouts/AuthenticatedLayout.vue';
import CardLayout from '../../components/Layouts/CardLayout.vue';

import request from '../../mixins/request';

export default {
  name: 'DisciplinesForm',
  components: {
    ActionButton,
    AuthenticatedLayout,
    CardLayout,
    RouteButton,
  },
  mixins: [request],
  data: () => ({
    errors: {},
    title: null,
  }),
  computed: {
    disciplineId() {
      return this.$route.params.id;
    },
  },
  async created() {
    if (this.disciplineId) {
      this.getDiscipline();
    }
  },
  methods: {
    async getDiscipline() {
      const discipline = await this.request('get', `/disciplines/${this.disciplineId}`);

      if (discipline) {
        this.title = discipline.title;
      }
    },
    async saveDiscipline() {
      this.errors = {};

      const data = { title: this.title };

      const discipline = this.disciplineId
        ? await this.request('put', `/disciplines/${this.disciplineId}`, data)
        : await this.request('post', '/disciplines', data);

      if (discipline) {
        this.$router.push('/disciplines');
      }
    },
  },
};
</script>
