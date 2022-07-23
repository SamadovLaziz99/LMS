import Vue from 'vue';
import Vuex from 'vuex';
import Login from "@/store/login";
import Students from "@/store/students";
import Teachers from "@/store/teachers";
import Subjects from "@/store/subjects";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: null,
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    Login,
    Students,
    Teachers,
    Subjects
  }
})
