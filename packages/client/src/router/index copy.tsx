import Loading from "@/components/loading";
import BasicLayout from "@/layout";
import { useBoundStore } from "@/store";
import Login from "@/views/Login";
import { useEffect, useMemo, useState } from "react";
import {
  createBrowserRouter,
  Navigate,
  redirect,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./components";
import NotFound from "./components/404";
import { getRoutes } from "./utils/getRoutes";

const Router = () => {
  // 从store获取路由表json,该json在登录时由请求接口获取
  const routes = useBoundStore((state) => state.routes);
  const [children, setChildren] = useState<RouteObject[]>([]);
  // 根据路由表生成子路由
  useEffect(() => {
    const router = getRoutes(routes);
    console.log("router: ", router);
    setChildren(router);
  }, [routes]);

  // 生成路由
  const router = useMemo(
    () =>
      createBrowserRouter([
        // {
        //   path: "/",
        //   element: <Navigate to={"/home"} />,
        // },
        {
          path: "/",
          element: <BasicLayout />,
          // errorElement: <ErrorPage />,
          children: [
            {
              children: children,
              errorElement: <ErrorPage />,
            },
          ],
          loader() {
            // token校验
            const token = localStorage.getItem("token");

            console.log("loader");
            if (!token || !routes.length) {
              console.log("跳转到login");
              return redirect("/login");
            }
            return null;
          },
        },
        {
          path: "/login",
          element: <Login />,
          errorElement: <ErrorPage />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ]),
    [children, routes],
  );
  return <RouterProvider router={router} fallbackElement={<Loading />} />;
};

export default Router;
