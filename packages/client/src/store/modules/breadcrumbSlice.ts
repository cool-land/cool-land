import { Routes } from "@/types";
import { genBreadcrumb } from "@/utils";
import { StateCreator } from "zustand";
import { resetters } from "..";
export interface BreadcrumbSlice {
  breadcrumb: { [key: string]: Routes };
  initBreadcrumb: (payload: Routes) => void;
}

const initBreadcrumbState = { breadcrumb: {} };

export const createBreadcrumbSlice: StateCreator<
  BreadcrumbSlice,
  [["zustand/devtools", never]],
  [],
  BreadcrumbSlice
> = (set) => {
  resetters.push(() => set(initBreadcrumbState));
  return {
    breadcrumb: {},
    initBreadcrumb: (payload) => {
      // 生成面包屑表
      const result = genBreadcrumb(payload);
      return set(() => ({ breadcrumb: result }), false, "breadcrumb");
    },
  };
};
