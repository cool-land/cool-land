import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { shallow } from "zustand/shallow";
import {
  BreadcrumbSlice,
  createBreadcrumbSlice,
} from "./modules/breadcrumbSlice";
import { createMenuSlice, MenuSlice } from "./modules/menuSlice";
import { createRouteSlice, RouteSlice } from "./modules/routeSlice";

type StoreState = RouteSlice & MenuSlice & BreadcrumbSlice;

// store集合
export const useBoundStore = create<StoreState>()(
  devtools(
    persist(
      (...a) => ({
        ...createRouteSlice(...a),
        ...createMenuSlice(...a),
        ...createBreadcrumbSlice(...a),
      }),
      { name: "RootStore" },
    ),
    { name: "RootStore" },
  ),
);

// 携带了shallow的useStore,可以浅比较store中的状态
// 防止引用类型即使内容没有变化依旧渲染
export const useShallowBoundStore = (
  f: (state: ReturnType<(typeof useBoundStore)["getState"]>) => any,
) => useBoundStore(f, shallow);
