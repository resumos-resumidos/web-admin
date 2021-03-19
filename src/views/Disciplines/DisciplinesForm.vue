<template>
  <CardLayout>
    <template #v-toolbar>
      <v-toolbar-title>
        Disciplinas
      </v-toolbar-title>
      <v-spacer />
      <RouteButton
        label="Voltar"
        route-path="/disciplines"
      />
    </template>
    <template #v-card-text>
      <v-form @submit.prevent>
        <v-text-field
          v-model="title"
          label="Disciplina"
          :error-messages="errors.title"
          @keydown.enter="saveDiscipline"
          @focus="errors.title = null"
        />
      </v-form>
    </template>
    <template #v-card-actions>
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
    RouteButton,
    CardLayout,
  },
  data: () => ({
    title: null,
    errors: {},
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
