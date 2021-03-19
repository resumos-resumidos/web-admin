<template>
  <CardLayout>
    <template #v-toolbar>
      <v-toolbar-title>
        Resumos
      </v-toolbar-title>
      <v-spacer />
      <RouteButton
        label="Voltar"
        route-path="/summaries"
      />
    </template>
    <template #v-card-text>
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
          :items="contents"
          label="Conteúdo"
          :error-messages="errors.content_id"
          no-data-text="Não existe nenhum contéudo cadastrado para esta disciplina"
          :disabled="disciplineId === null"
          :messages="disciplineId === null ? contentIdHint : null"
          @focus="errors.content_id = null"
        />
        <v-text-field
          v-model="title"
          label="Resumo"
          :error-messages="errors.title"
          @keydown.enter="saveSummary"
          @focus="errors.title = null"
        />
        <v-checkbox
          v-model="free"
          label="Gratuito"
          :error-messages="errors.free"
          @click="errors.free = null"
        />
      </v-form>
    </template>
    <template #v-card-actions>
      <ActionButton
        label="Salvar"
        @action="saveSummary"
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
  name: 'SummariesForm',
  components: {
    ActionButton,
    RouteButton,
    CardLayout,
  },
  data: () => ({
    disciplineId: null,
    contentId: null,
    title: null,
    free: false,
    disciplines: [],
    contents: [],
    errors: {},
    contentIdHint: 'Selecione uma disciplina para buscar seus respectivos conteúdos',
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
    async getDisciplines() {
      try {
        const disciplines = await api.get('/disciplines');

        if (disciplines.length > 0) {
          this.disciplines.push({ value: null, text: '' });
          disciplines.forEach((discipline) => this.disciplines.push({
            value: discipline.id,
            text: discipline.title,
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
    async getContentsByDiscipline() {
      try {
        this.contentId = null;
        this.contents = [];

        if (this.disciplineId !== null) {
          const discipline = await api.get(`/disciplines/${this.disciplineId}`);

          if (discipline.contents.length > 0) {
            this.contents.push({ value: null, text: '' });
            discipline.contents.forEach((content) => this.contents.push({
              value: content.id,
              text: content.title,
            }));
          }
        }
      } catch (error) {
        this.HANDLE_SNACKBAR({ show: true, text: error });
      }
    },
    async saveSummary() {
      try {
        this.errors = {};

        const data = {
          content_id: this.contentId,
          title: this.title,
          free: this.free,
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
