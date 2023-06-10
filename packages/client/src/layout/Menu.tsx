import { useBoundStore } from "@/store";
import { Menu } from "antd";
import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getMenu } from "./utils/getMenu";

const LayoutMenu: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  // const matches = useMatches();
  // 活动菜单
  const [activeKey, setActiveKey] = useState<string[]>([]);
  // 路由表
  const routes = useBoundStore((state) => state.routes);
  // 生成菜单
  const items = getMenu(routes);
  // 点击菜单
  const menuSelect = ({ key }: any) => {
    navigate(key);
    setActiveKey(key);
  };
  // 根据路由变化,设置activeKey
  useEffect(() => {
    // const currentMatch = matches[matches.length -1];
    setActiveKey([pathname]);
  }, [pathname]);

  return (
    <nav className="nav-content">
      <Menu
        style={{ border: "none", height: "100%" }}
        selectedKeys={activeKey}
        theme={"light"}
        items={items}
        mode={"inline"}
        onSelect={menuSelect}
      />
    </nav>
  );
};

export default LayoutMenu;
