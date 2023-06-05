import lazyLoad from "@/components/lazyLoad";
import { Routes } from "@/types";
import ErrorPage from "../components";

// 动态加载路由
export const getRoutes = (router: Routes, parentPath = ""): any[] => {
  if (!router) return [];
  return router.map((route) => {
    if (route.children) {
      return {
        ...route,
        children: [...getRoutes(route.children, route.path)],
      };
    } else {
      return {
        ...route,
        // index: route.index ?? false,
        element: route.element ? lazyLoad(route.element) : "",
        path: parentPath + (route.path ?? ""),
        // errorElement: <ErrorPage />,
        // loader: () => {
        //   return route.data || {};
        // },
      };
    }
  });
};

// 动态加载路由
// export const getRoutes = async (
//   router?: Routes,
//   parent = "",
//   arr: any = [],
// ) => {
//   if (!router) return [];
//   for (const route of router) {
//     const item: RouteObject = {
//       index: route.index ?? false,
//       path: parent + (route.path ?? ""),
//       errorElement: <ErrorPage />,
//       // 此处加载路由JSON中携带的数据
//       loader: () => {
//         return route.data || {};
//       },
//     };
//     //如果有element就加载组件
//     if (route.element) {
//       item.element = <LazyLoad modulePath={route.element} />;
//     }
//     // 如果有children子路由就递归加载
//     if (route.children) {
//       item.children = [
//         ...(await getRoutes(route.children ?? undefined, route.path)),
//       ];
//     }
//     arr.push(item);
//   }
//   return arr;
// };
