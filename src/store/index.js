import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const getInitialState = () => ({
  accessToken: null,
  loading: false,
  snackbar: {
    show: false,
    text: null,
  },
});

export default new Vuex.Store({
  actions: {},
  modules: {},
  mutations: {
    HANDLE_SNACKBAR: (state, { show, text }) => {
      state.snackbar.show = show;
      state.snackbar.text = text;
    },
    SET_ACCESS_TOKEN: (state, accessToken) => {
      state.accessToken = accessToken;
    },
    SET_LOADING: (state, loading) => {
      state.loading = loading;
    },
  },
  state: getInitialState(),
});
