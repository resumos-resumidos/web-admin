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
        @click="createContent"
      >
        Salvar
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import api from '../../services/api';

export default {
  name: 'ContentsCreate',
  data: () => ({
    disciplineId: null,
    title: null,
    disciplines: [],
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
    async createContent() {
      try {
        this.errors = {};

        await api.post('/contents', {
          discipline_id: this.disciplineId,
          title: this.title,
        });

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
