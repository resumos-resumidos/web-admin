<template>
  <AuthenticatedLayout>
    <CardLayout>
      <template #toolbar>
        <v-toolbar-title>
          Resumos
        </v-toolbar-title>
        <v-spacer />
        <RouteButton
          label="Voltar"
          route-path="/summaries"
        />
      </template>
      <template #cardText>
        <v-form @submit.prevent>
          <v-select
            v-model="disciplineId"
            :items="disciplines"
            label="Disciplina"
            no-data-text="Não existe nenhuma disciplina cadastrada"
            @change="getContentsByDiscipline"
          />
          <v-select
            v-model="contentId"
            :disabled="disciplineId === null"
            :error-messages="errors.content_id"
            :items="contents"
            label="Conteúdo"
            :messages="disciplineId === null ? contentIdHint : null"
            no-data-text="Não existe nenhum contéudo cadastrado para esta disciplina"
            @focus="errors.content_id = null"
          />
          <v-text-field
            v-model="title"
            :error-messages="errors.title"
            label="Resumo"
            @focus="errors.title = null"
            @keydown.enter="saveSummary"
          />
          <v-checkbox
            v-model="free"
            :error-messages="errors.free"
            label="Gratuito"
            @click="errors.free = null"
          />
        </v-form>
      </template>
      <template #cardActions>
        <ActionButton
          label="Salvar"
          @action="saveSummary"
        />
      </template>
    </CardLayout>
  </AuthenticatedLayout>
</template>

<script>
import { mapMutations } from 'vuex';

import ActionButton from '../../components/Buttons/ActionButton.vue';
import RouteButton from '../../components/Buttons/RouteButton.vue';
import AuthenticatedLayout from '../../components/Layouts/AuthenticatedLayout.vue';
import CardLayout from '../../components/Layouts/CardLayout.vue';

import api from '../../services/api';

export default {
  name: 'SummariesForm',
  components: {
    ActionButton,
    AuthenticatedLayout,
    CardLayout,
    RouteButton,
  },
  data: () => ({
    contentId: null,
    contentIdHint: 'Selecione uma disciplina para buscar seus respectivos conteúdos',
    contents: [],
    disciplineId: null,
    disciplines: [],
    errors: {},
    free: false,
    title: null,
  }),
  computed: {
    summaryId() {
      return this.$route.params.id;
    },
  },
  async created() {
    this.getDisciplines();

    if (this.summaryId) {
      this.getSummary();
    }
  },
  methods: {
    ...mapMutations(['HANDLE_SNACKBAR']),
    async getContentsByDiscipline() {
      try {
        this.contentId = null;
        this.contents = [];

        if (this.disciplineId !== null) {
          const discipline = await api.get(`/disciplines/${this.disciplineId}`);

          if (discipline.contents.length > 0) {
            this.contents.push({ text: '', value: null });
            discipline.contents.forEach((content) => this.contents.push({
              text: content.title,
              value: content.id,
            }));
          }
        }
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
    async getSummary() {
      try {
        const summary = await api.get(`/summaries/${this.summaryId}`);

        this.disciplineId = summary.content.discipline.id;
        this.title = summary.title;
        this.free = summary.free;

        await this.getContentsByDiscipline();

        this.contentId = summary.content.id;
      } catch (error) {
        this.HANDLE_SNACKBAR({ show: true, text: error });
      }
    },
    async saveSummary() {
      try {
        this.errors = {};

        const data = {
          content_id: this.contentId,
          free: this.free,
          title: this.title,
        };

        if (this.summaryId) {
          await api.put(`/summaries/${this.summaryId}`, data);
        } else {
          await api.post('/summaries', data);
        }

        this.$router.push('/summaries');
      } catch (errors) {
        Object.keys(errors).forEach((field) => {
          this.errors = { [field]: errors[field], ...this.errors };
        });
      }
    },
  },
};
</script>
