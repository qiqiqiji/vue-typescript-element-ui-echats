import { Module } from "vuex";
import { state } from "./state";
import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { SidebarState } from "./types";

const namespaced: boolean = true;

export const app: Module<SidebarState, any> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
};
