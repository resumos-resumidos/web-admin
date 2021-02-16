<template>
  <div>
    <v-card-text>
      <v-form>
        <v-text-field
          v-model="title"
          label="Título"
          :error-messages="errors.title"
        />
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        color="primary"
        @click="edit"
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
    id() {
      return this.$route.params.id;
    },
  },
  async created() {
    try {
      const { title } = await api.get(`/disciplines/${this.id}`);
      this.title = title;
    } catch (error) {
      this.HANDLE_SNACKBAR({ show: true, text: error });
    }
  },
  methods: {
    ...mapMutations(['HANDLE_SNACKBAR']),
    async edit() {
      try {
        this.errors = {};

        const { title } = this;
        await api.put(`/disciplines/${this.id}`, { title });

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
