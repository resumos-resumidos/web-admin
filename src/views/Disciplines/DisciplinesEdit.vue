<template>
  <div>
    <v-card-text>
      <v-form>
        <v-text-field
          v-model="title"
          label="Disciplina"
          :error-messages="errors.title"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        color="primary"
        @click="editDiscipline"
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
  name: 'DisciplinesEdit',
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
    this.getDiscipline();
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
    async editDiscipline() {
      try {
        this.errors = {};

        await api.put(`/disciplines/${this.disciplineId}`, {
          title: this.title,
        });

        this.$router.push('/disciplines');
      } catch (errors) {
        Object.keys(errors).forEach((field) => {
          this.errors = { [field]: errors[field].join(' / '), ...this.errors };
        });
      }
    },
  },
};
</script>
