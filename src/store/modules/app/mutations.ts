import { MutationTree } from "vuex";
import { SidebarState } from "./types";
import { SIDE_TOGGLE, GET_MENU } from "./mutations-types";

export const mutations: MutationTree<SidebarState> = {
  SIDE_TOGGLE(state) {
    state.isOpen = !state.isOpen;
  },
  GET_MENU(state, data) {
    state.menu = data;
  }
};
