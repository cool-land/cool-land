import CollapsedButton from "@/components/collapsedButton";
import Logo from "@/components/logo";
import { useBoundStore } from "@/store";
import { LogoutOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Layout, MenuProps } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import BreadcrumbView from "./Breadcrumb";
import "./index.scss";
import LayoutMenu from "./Menu";

export default function BasicLayout() {
  const { Header, Sider, Content, Footer } = Layout;
  const navigate = useNavigate();
  const [collapsed, collapse] = useBoundStore((state) => [
    state.collapsed,
    state.collapse,
  ]);

  const options = [
    {
      label: "登出",
      key: "logout",
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];
  const dropdownSelect: MenuProps["onClick"] = ({ key }) => {
    switch (key) {
      case "logout":
        navigate("/login");
        break;
    }
  };

  return (
    <Layout className="layout-page">
      {/* 左侧边栏 */}
      <Sider
        theme={"light"}
        collapsed={collapsed}
        onCollapse={(collapsed) => collapse(collapsed)}>
        <Logo collapsed={collapsed} />
        <LayoutMenu />
      </Sider>
      {/* 右侧整体 */}
      <Layout>
        {/* 头部 */}
        <Header className="layout-page-header">
          <div className="left">
            {/* 折叠按钮 */}
            <CollapsedButton collapse={collapse} collapsed={collapsed} />
            {/* 面包屑 */}
            <BreadcrumbView />
          </div>
          <div className="right">
            {/* 头像 */}
            <Dropdown
              menu={{ items: options, onClick: dropdownSelect }}
              trigger={["hover"]}>
              <Avatar src="https://hooks.spicyboy.cn/assets/png/avatar-4ef6186b.png"></Avatar>
            </Dropdown>
          </div>
        </Header>
        {/* 内容区 */}
        <Content className="layout-page-content">
          <Outlet />
        </Content>
        {/* 底部 */}
        <Footer className="layout-page-footer">React Admin</Footer>
      </Layout>
    </Layout>
  );
}
