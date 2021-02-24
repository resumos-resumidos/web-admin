<template>
  <div>
    <v-card-text>
      <v-form>
        <v-select
          v-model="disciplineId"
          :items="disciplines"
          label="Disciplina"
          :error-messages="errors.discipline_id"
          no-data-text="Não existe nenhuma disciplina cadastrada"
        />
        <v-text-field
          v-model="title"
          label="Conteúdo"
          :error-messages="errors.title"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        color="primary"
        @click="saveContent"
      >
        Salvar
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

import api from '../../services/api';

export default {
  name: 'ContentsForm',
  data: () => ({
    disciplineId: null,
    title: null,
    disciplines: [],
    errors: {},
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
    async getDisciplines() {
      try {
        const disciplines = await api.get('/disciplines');

        disciplines.forEach((discipline) => this.disciplines.push({
          value: discipline.id,
          text: discipline.title,
        }));
      } catch (error) {
        this.HANDLE_SNACKBAR({ show: true, text: error });
      }
    },
    async getContent() {
      try {
        const content = await api.get(`/contents/${this.contentId}`);

        this.disciplineId = content.discipline_id;
        this.title = content.title;
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
          this.errors = { [field]: errors[field].join(' / '), ...this.errors };
        });
      }
    },
  },
};
</script>
