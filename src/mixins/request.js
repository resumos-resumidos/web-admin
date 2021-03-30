import api from '../services/api';

export default {
  methods: {
    async request(method, url, data) {
      try {
        const response = await api({
          method,
          url,
          ...(data && { data }),
        });

        return response;
      } catch (error) {
        if (typeof error === 'object') {
          Object.keys(error).forEach((field) => {
            this.errors = { [field]: error[field], ...this.errors };
          });
        } else {
          this.$store.commit('HANDLE_SNACKBAR', { show: true, text: error });
        }

        return false;
      }
    },
  },
};
