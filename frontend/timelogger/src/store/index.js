import Vue from "vue";
import Vuex from "vuex";

import auth from "@/store/modules/auth";
import category from "@/store/modules/category";
import timer from "@/store/modules/timer";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    category,
    timer,
  },
});
