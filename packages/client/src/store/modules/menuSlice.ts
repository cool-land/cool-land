import { Routes } from "@/types";
import { StateCreator } from "zustand";

export interface MenuSlice {
  /**
   * @description 侧边栏折叠状态
   * */
  collapsed: boolean;
  /**
   * @description 拼接父级路由的菜单
   * */
  menu: Routes;
  collapse: (payload: boolean) => void;
  initRegRouteJson: (payload: Routes) => void;
}

export const createMenuSlice: StateCreator<
  MenuSlice,
  [["zustand/devtools", never]],
  [],
  MenuSlice
> = (set) => ({
  collapsed: false,
  menu: [],
  collapse: (payload) =>
    set(() => ({ collapsed: payload }), false, "menu/collapse"),
  initRegRouteJson: (payload) =>
    set(() => ({ menu: payload }), false, "menu/initMenu"),
});
