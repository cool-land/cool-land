import { Routes } from "@/types";

// 生成面包屑表
export const genBreadcrumb = (
  route: Routes,
  cache: any[] = [],
  result: { [key: string]: Routes } = {},
) => {
  route.forEach((item) => {
    cache.push(item);
    if (item.children?.length) {
      genBreadcrumb(item.children, cache, result);
    } else {
      item.path && (result[item.path] = [...cache]);
    }
    cache.pop();
  });
  cache.length = 0;
  return result;
};
