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
        @click="create"
      >
        Salvar
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
import api from '../../services/api';

export default {
  name: 'DisciplinesCreate',
  data: () => ({
    title: null,
    errors: {},
  }),
  methods: {
    async create() {
      try {
        this.errors = {};

        const { title } = this;
        await api.post('/disciplines', { title });

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
