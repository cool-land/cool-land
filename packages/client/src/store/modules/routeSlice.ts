import { Routes } from "@/types";
import { StateCreator } from "zustand";

export interface RouteSlice {
  routes: Routes;
  initRoutes: (payload: any) => void;
}

export const createRouteSlice: StateCreator<
  RouteSlice,
  [["zustand/devtools", never]],
  [],
  RouteSlice
> = (set) => ({
  routes: [],
  initRoutes: (payload) =>
    set(() => ({ routes: payload }), false, "initRoutes"),
});
