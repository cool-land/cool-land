import BasicLayout from "@/layout";
import { useShallowBoundStore } from "@/store";
import Login from "@/views/Login";
import { useLayoutEffect, useState } from "react";
import { Navigate, RouteObject, useRoutes } from "react-router-dom";
import NotFound from "./components/404";
import { getRoutes } from "./utils/getRoutes";

const Router = () => {
  // 从store获取路由表json,该json在登录时由请求接口获取
  const routes = useShallowBoundStore((state) => state.routes);
  const [children, setChildren] = useState<RouteObject[]>([]);
  // 根据路由表生成子路由
  useLayoutEffect(() => {
    const router = getRoutes(routes);
    console.log("router: ", router);
    setChildren(router);
  }, [routes]);

  // 生成路由
  const rootRoutes: RouteObject[] = [
    {
      path: "/",
      element: <Navigate to="/home" />,
    },
    {
      path: "/",
      element: <BasicLayout />,
      children: children,
    },
    {
      path: "/login",
      element: <Login />,
      // errorElement: <ErrorPage />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ];

  const router = useRoutes(rootRoutes);

  return router;
};

export default Router;
