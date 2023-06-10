import { StateCreator } from "zustand";

export interface ThemeSlice {
  theme: "dark" | "light";
  primaryColor: string;
  changeTheme: (payload: ThemeSlice["theme"]) => void;
}

export const createThemeSlice: StateCreator<
  ThemeSlice,
  [["zustand/devtools", never]],
  [],
  ThemeSlice
> = (set) => ({
  theme: "dark",
  primaryColor: "#13c2c2",
  changeTheme: (payload) =>
    set(() => ({ theme: payload }), false, "theme/changeTheme"),
});
