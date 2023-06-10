import { Routes } from "@/types";
import { StateCreator } from "zustand";
import { resetters } from "..";

export interface RouteSlice {
  routes: Routes;
  initRoutes: (payload: any) => void;
}

const initRouteState = { routes: [] };

export const createRouteSlice: StateCreator<
  RouteSlice,
  [["zustand/devtools", never]],
  [],
  RouteSlice
> = (set) => {
  resetters.push(() => set(initRouteState));
  return {
    ...initRouteState,
    initRoutes: (payload) =>
      set(() => ({ routes: payload }), false, "initRoutes"),
  };
};
