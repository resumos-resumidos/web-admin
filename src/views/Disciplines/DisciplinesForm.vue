<template>
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
</template>

<script>
import { mapMutations } from 'vuex';

import ActionButton from '../../components/Buttons/ActionButton.vue';
import RouteButton from '../../components/Buttons/RouteButton.vue';
import CardLayout from '../../components/Layouts/CardLayout.vue';

import api from '../../services/api';

export default {
  name: 'DisciplinesForm',
  components: {
    ActionButton,
    CardLayout,
    RouteButton,
  },
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
    ...mapMutations(['HANDLE_SNACKBAR']),
    async getDiscipline() {
      try {
        const discipline = await api.get(`/disciplines/${this.disciplineId}`);
        this.title = discipline.title;
      } catch (error) {
        this.HANDLE_SNACKBAR({ show: true, text: error });
      }
    },
    async saveDiscipline() {
      try {
        this.errors = {};

        const data = {
          title: this.title,
        };

        if (this.disciplineId) {
          await api.put(`/disciplines/${this.disciplineId}`, data);
        } else {
          await api.post('/disciplines', data);
        }

        this.$router.push('/disciplines');
      } catch (errors) {
        Object.keys(errors).forEach((field) => {
          this.errors = { [field]: errors[field], ...this.errors };
        });
      }
    },
  },
};
</script>
