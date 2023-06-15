import { useShallowBoundStore } from "@/store";
import { Menu } from "antd";
import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getMenu } from "./utils/getMenu";

const LayoutMenu: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // 活动菜单
  const [activeKey, setActiveKey] = useState<string[]>([]);
  // 路由表
  const routes = useShallowBoundStore((state) => state.routes);
  // 生成菜单
  const items = getMenu(routes);
  // 点击菜单
  const menuSelect = ({ key }: any) => {
    navigate(key);
    setActiveKey(key);
  };
  // 判断pathname是否对应key
  const isKey = (pathname: string, arr: any[]): boolean => {
    return arr.some((item) => {
      if (item.children) {
        return isKey(pathname, item.children);
      }
      return item.key === pathname;
    });
  };
  // 根据路由变化,设置activeKey
  useEffect(() => {
    if (isKey(location.pathname, items)) {
      setActiveKey([location.pathname]);
    }
  }, [location.pathname]);

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
