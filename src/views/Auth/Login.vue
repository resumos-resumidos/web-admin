<template>
  <GuestLayout>
    <CardLayout>
      <template #toolbar>
        <v-toolbar-title>
          Resumos Resumidos
        </v-toolbar-title>
      </template>
      <template #cardText>
        <v-form @submit.prevent>
          <v-text-field
            v-model="email"
            :error-messages="errors.email"
            label="E-mail"
            type="email"
            @focus="errors.email = null"
            @keydown.enter="login"
          />
          <v-text-field
            v-model="password"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :error-messages="errors.password"
            label="Senha"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
            @focus="errors.password = null"
            @keydown.enter="login"
          />
        </v-form>
      </template>
      <template #cardActions>
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

import request from '../../mixins/request';
import { getAccessToken, setAccessToken } from '../../services/accessToken/localStorage';

export default {
  name: 'Login',
  components: {
    ActionButton,
    CardLayout,
    GuestLayout,
  },
  mixins: [request],
  data: () => ({
    email: null,
    errors: {},
    password: null,
    showPassword: false,
  }),
  methods: {
    ...mapMutations(['SET_ACCESS_TOKEN']),
    async login() {
      this.errors = {};

      const accessToken = await this.request('post', '/auth/login', {
        email: this.email,
        password: this.password,
      });

      if (accessToken) {
        setAccessToken(accessToken.access_token);
        this.SET_ACCESS_TOKEN(getAccessToken());
        this.$router.push('/');
      }
    },
  },
};
</script>
