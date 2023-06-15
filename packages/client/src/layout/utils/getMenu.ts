import { Routes } from "@/types";
import * as Icons from "@ant-design/icons";
import { MenuProps } from "antd";
import React from "react";

type MenuItem = Required<MenuProps>["items"];

// 动态渲染 Icon 图标
const customIcons: { [key: string]: any } = Icons;
const addIcon = (name: string) => {
  return React.createElement(customIcons[name]);
};

export const getMenu = (
  router: Routes,
  parentPath = "",
  arr: MenuItem = [],
) => {
  router.forEach((route) => {
    if (!route.isHide) {
      const item: MenuItem[number] = {
        label: route.label,
        key: parentPath + (route.path ?? ""),
        icon: route.icon ? addIcon(route.icon as string) : "",
      };
      if (route.children) {
        item.children = getMenu(route.children, route.path);
      }
      arr.push(item);
    }
  });
  return arr;
};
