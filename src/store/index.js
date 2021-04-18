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
    SET_ACCESS_TOKEN: (state, accessToken) => {
      state.accessToken = accessToken;
    },
    SET_LOADING: (state, loading) => {
      state.loading = loading;
    },
    SET_SNACKBAR: (state, { show, text }) => {
      state.snackbar.show = show;
      state.snackbar.text = text;
    },
  },
  state: getInitialState(),
});
