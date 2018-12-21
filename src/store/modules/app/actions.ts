import { ActionTree } from "vuex";
import { SidebarState } from "./types";
import { SIDE_TOGGLE, GET_MENU } from "./mutations-types";
import { getMenu } from "@/api";

export const actions: ActionTree<SidebarState, any> = {
  sideToggle({ commit }): any {
    commit("SIDE_TOGGLE");
  },
  getMenu({ commit }): any {
    getMenu({ id: "0" }).then((result: any) => {
      if (result.data.success) {
        let data: any = result.data.source;
        commit("GET_MENU", data);
      }
    });
  }
};
