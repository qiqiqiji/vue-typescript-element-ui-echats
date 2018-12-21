import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { app } from "./modules/app";

Vue.use(Vuex);

const store: StoreOptions<any> = {
  modules: {
    app
  }
};

export default new Vuex.Store(store);
