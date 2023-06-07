import { Routes } from "@/types";
import * as Icons from "@ant-design/icons";
import React from "react";

// 动态渲染 Icon 图标
const customIcons: { [key: string]: any } = Icons;
const addIcon = (name: string) => {
  return React.createElement(customIcons[name]);
};

export const getMenu = (router: Routes, parentPath = ""): any => {
  return router.map((route) => {
    if (route.children) {
      return {
        ...route,
        children: getMenu(route.children, route.path),
      };
    } else {
      return {
        ...route,
        key: parentPath + (route.path ?? ""),
        icon: addIcon(route.icon as string),
        path: parentPath + (route.path ?? ""),
      };
    }
  });
};
