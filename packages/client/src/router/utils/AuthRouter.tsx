// 路由权限高阶组件

import { useBoundStore, useShallowBoundStore } from "@/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthRouter = ({ children }: { children: any }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const routes = useShallowBoundStore((state) => state.routes);
  // token过期跳转login

  useEffect(() => {
    if (!token || !routes.length) return navigate("/login");
  }, [navigate]);

  return children;
};

export default AuthRouter;
