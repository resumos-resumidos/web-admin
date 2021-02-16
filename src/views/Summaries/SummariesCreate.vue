<template>
  <div>
    <v-card-text>
      <v-form>
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
        />
        <v-text-field
          v-model="title"
          label="Resumo"
          :error-messages="errors.title"
        />
        <v-checkbox
          v-model="free"
          label="Gratuito"
          :error-messages="errors.free"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        color="primary"
        @click="createSummary"
      >
        Salvar
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import api from '../../services/api';

export default {
  name: 'SummariesCreate',
  data: () => ({
    disciplineId: null,
    contentId: null,
    title: null,
    free: false,
    disciplines: [],
    contents: [],
    errors: {},
  }),
  async created() {
    this.getDisciplines();
  },
  methods: {
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
    async createSummary() {
      try {
        this.errors = {};

        await api.post('/summaries', {
          content_id: this.contentId,
          title: this.title,
          free: this.free,
        });

        this.$router.push('/summaries');
      } catch (errors) {
        Object.keys(errors).forEach((field) => {
          this.errors = { [field]: errors[field].join(' / '), ...this.errors };
        });
      }
    },
  },
};
</script>
