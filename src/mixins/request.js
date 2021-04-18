import api from '../services/api';

export default {
  methods: {
    async request(method, url, data) {
      this.$store.commit('SET_LOADING', true);

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
          this.$store.commit('HANDLE_SNACKBAR', { show: true, text: error });
        }

        return false;
      } finally {
        this.$store.commit('SET_LOADING', false);
      }
    },
  },
};
