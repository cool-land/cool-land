// 路由权限高阶组件

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthRouter = ({ children }: { children: any }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  // token过期跳转login

  useEffect(() => {
    if (!token) return navigate("/login");
  }, [navigate]);

  return children;
};

export default AuthRouter;
