import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    snackbar: {
      show: false,
      text: null,
    },
  },
  mutations: {
    SHOW_SNACKBAR: (state, { show, text }) => {
      state.snackbar.show = show;
      state.snackbar.text = text;
    },
    CLOSE_SNACKBAR: (state) => {
      state.snackbar.show = false;
      state.snackbar.text = null;
    },
  },
  actions: {
  },
  modules: {
  },
});
