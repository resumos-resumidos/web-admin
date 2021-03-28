import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const getInitialState = () => ({
  accessToken: null,
  snackbar: {
    show: false,
    text: null,
  },
});

export default new Vuex.Store({
  actions: {
    async getAccessToken({ commit }) {
      const accessToken = localStorage.getItem('accessToken');
      commit('SET_ACCESS_TOKEN', accessToken);
    },
  },
  modules: {},
  mutations: {
    HANDLE_SNACKBAR: (state, { show, text }) => {
      state.snackbar.show = show;
      state.snackbar.text = text;
    },
    SET_ACCESS_TOKEN: (state, accessToken) => {
      state.accessToken = accessToken;
    },
  },
  state: getInitialState(),
});
