import Vue from "vue";
import Vuex from "vuex";
import { formConf } from "@/components/generator/config";
import { deepClone } from "@/utils/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    drawingList: [],
    idGlobal: 0,
    formConf: deepClone(formConf),
    activeData: {},
  },
  mutations: {
    ADD_DRAWING(state, data) {
      state.drawingList.push(data);
    },
    DELETE_DRAWING(state, index) {
      state.drawingList.splice(index, 1);
    },
    COPY_DRAWING(state, { data, index }) {
      state.drawingList.splice(index, 0, data);
    },
    SET_DRAWING(state, data) {
      state.drawingList = deepClone(data);
    },
    SET_IDGLOBAL(state) {
      ++state.idGlobal;
    },
    SET_FORMCONF(state, data) {
      state.formConf = data;
    },
    SET_ACTIVEDATA(state, data) {
      state.activeData = data;
    },
  },
  actions: {},
  modules: {},
});
