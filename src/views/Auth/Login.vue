<template>
  <GuestLayout>
    <CardLayout>
      <template #v-toolbar>
        <v-toolbar-title>
          Resumos Resumidos
        </v-toolbar-title>
      </template>
      <template #v-card-text>
        <v-form @submit.prevent>
          <v-text-field
            v-model="email"
            type="email"
            label="E-mail"
            :error-messages="errors.email"
            @keydown.enter="login"
            @focus="errors.email = null"
          />
          <v-text-field
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            label="Senha"
            :error-messages="errors.password"
            @click:append="showPassword = !showPassword"
            @keydown.enter="login"
            @focus="errors.password = null"
          />
        </v-form>
      </template>
      <template #v-card-actions>
        <ActionButton
          label="Entrar"
          @action="login"
        />
      </template>
    </CardLayout>
  </GuestLayout>
</template>

<script>
import { mapMutations } from 'vuex';

import ActionButton from '../../components/Buttons/ActionButton.vue';
import CardLayout from '../../components/Layouts/CardLayout.vue';
import GuestLayout from '../../components/Layouts/GuestLayout.vue';

import api from '../../services/api';

export default {
  name: 'Login',
  components: {
    ActionButton,
    CardLayout,
    GuestLayout,
  },
  data: () => ({
    email: null,
    password: null,
    showPassword: false,
    errors: {},
  }),
  methods: {
    ...mapMutations(['HANDLE_SNACKBAR']),
    async login() {
      try {
        this.errors = {};

        await api.post('/auth/login', {
          email: this.email,
          password: this.password,
        });
      } catch (errors) {
        if (typeof errors === 'object') {
          Object.keys(errors).forEach((field) => {
            this.errors = { [field]: errors[field], ...this.errors };
          });
        } else {
          this.HANDLE_SNACKBAR({ show: true, text: errors });
        }
      }
    },
  },
};
</script>
