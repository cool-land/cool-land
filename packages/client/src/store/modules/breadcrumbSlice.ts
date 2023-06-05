import { genBreadcrumb } from "@/utils";
import { StateCreator } from "zustand";
export interface BreadcrumbSlice {
  /**
   * @description 面包屑
   * */
  breadcrumb: { [key: string]: Routes };

  /**
   * @description 初始化面包屑
   * */
  initBreadcrumb: (payload: Routes) => void;
}

export const createBreadcrumbSlice: StateCreator<
  BreadcrumbSlice,
  [["zustand/devtools", never]],
  [],
  BreadcrumbSlice
> = (set) => ({
  breadcrumb: {},
  initBreadcrumb: (payload) => {
    // 生成面包屑表
    const result = genBreadcrumb(payload);
    return set(() => ({ breadcrumb: result }), false, "breadcrumb");
  },
});
