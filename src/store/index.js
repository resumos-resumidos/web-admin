import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  actions: {
  },
  modules: {
  },
  mutations: {
    HANDLE_SNACKBAR: (state, { show, text }) => {
      state.snackbar.show = show;
      state.snackbar.text = text;
    },
  },
  state: {
    snackbar: {
      show: false,
      text: null,
    },
  },
});
