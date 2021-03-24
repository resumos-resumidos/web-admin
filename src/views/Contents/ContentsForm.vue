<template>
  <CardLayout>
    <template #toolbar>
      <v-toolbar-title>
        Contéudos
      </v-toolbar-title>
      <v-spacer />
      <RouteButton
        label="Voltar"
        route-path="/contents"
      />
    </template>
    <template #cardText>
      <v-form @submit.prevent>
        <v-select
          v-model="disciplineId"
          :error-messages="errors.discipline_id"
          :items="disciplines"
          label="Disciplina"
          no-data-text="Não existe nenhuma disciplina cadastrada"
          @focus="errors.discipline_id = null"
        />
        <v-text-field
          v-model="title"
          :error-messages="errors.title"
          label="Conteúdo"
          @focus="errors.title = null"
          @keydown.enter="saveContent"
        />
      </v-form>
    </template>
    <template #cardActions>
      <ActionButton
        label="Salvar"
        @action="saveContent"
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
  name: 'ContentsForm',
  components: {
    ActionButton,
    CardLayout,
    RouteButton,
  },
  data: () => ({
    disciplineId: null,
    disciplines: [],
    errors: {},
    title: null,
  }),
  computed: {
    contentId() {
      return this.$route.params.id;
    },
  },
  async created() {
    this.getDisciplines();

    if (this.contentId) {
      this.getContent();
    }
  },
  methods: {
    ...mapMutations(['HANDLE_SNACKBAR']),
    async getContent() {
      try {
        const content = await api.get(`/contents/${this.contentId}`);

        this.disciplineId = content.discipline_id;
        this.title = content.title;
      } catch (error) {
        this.HANDLE_SNACKBAR({ show: true, text: error });
      }
    },
    async getDisciplines() {
      try {
        const disciplines = await api.get('/disciplines');

        if (disciplines.length > 0) {
          this.disciplines.push({ text: '', value: null });
          disciplines.forEach((discipline) => this.disciplines.push({
            text: discipline.title,
            value: discipline.id,
          }));
        }
      } catch (error) {
        this.HANDLE_SNACKBAR({ show: true, text: error });
      }
    },
    async saveContent() {
      try {
        this.errors = {};

        const data = {
          discipline_id: this.disciplineId,
          title: this.title,
        };

        if (this.contentId) {
          await api.put(`/contents/${this.contentId}`, data);
        } else {
          await api.post('/contents', data);
        }

        this.$router.push('/contents');
      } catch (errors) {
        Object.keys(errors).forEach((field) => {
          this.errors = { [field]: errors[field], ...this.errors };
        });
      }
    },
  },
};
</script>
