import { mapMutations } from 'vuex';

import api from '../services/api';

export default {
  methods: {
    ...mapMutations([
      'HANDLE_SNACKBAR',
      'SET_LOADING',
    ]),
    async request(method, url, data) {
      this.SET_LOADING(true);

      try {
        const response = await api({
          method,
          url,
          ...(data && { data }),
        });

        return response || true;
      } catch (error) {
        if (typeof error === 'object') {
          Object.keys(error).forEach((field) => {
            this.errors = { [field]: error[field], ...this.errors };
          });
        } else if (error === 'O token de autenticação informado é inválido') {
          this.$router.push('/login');
        } else {
          this.HANDLE_SNACKBAR({ show: true, text: error });
        }

        return false;
      } finally {
        this.SET_LOADING(false);
      }
    },
  },
};
