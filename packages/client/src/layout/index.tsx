import CollapsedButton from "@/components/collapsedButton";
import { IconFont } from "@/components/icon";
import Logo from "@/components/logo";
import { resetAllSlices, useBoundStore } from "@/store";
import { LogoutOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Dropdown,
  Layout,
  MenuProps,
  Space,
  theme as AntdTheme,
} from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import BreadcrumbView from "./Breadcrumb";
import "./index.scss";
import LayoutMenu from "./Menu";

export default function BasicLayout() {
  const { Header, Sider, Content, Footer } = Layout;
  const { token } = AntdTheme.useToken();
  const navigate = useNavigate();
  const [collapsed, collapse, theme, changeTheme] = useBoundStore((state) => [
    state.collapsed,
    state.collapse,
    state.theme,
    state.changeTheme,
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
        // 清除用户数据
        window.localStorage.clear();
        // 清空store
        resetAllSlices();
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
        collapsible
        onCollapse={(collapsed) => collapse(collapsed)}>
        <Logo collapsed={collapsed} theme={theme} />
        <LayoutMenu />
      </Sider>
      {/* 右侧整体 */}
      <Layout>
        {/* 头部 */}
        <Header
          className="layout-page-header"
          style={{ background: token.colorBgContainer }}>
          <div className="left">
            {/* 折叠按钮 */}
            <CollapsedButton collapse={collapse} collapsed={collapsed} />
            {/* 面包屑 */}
            <BreadcrumbView />
          </div>
          <div className="right">
            <Space>
              {/* 切换主题 */}
              <Button
                type="text"
                icon={
                  <IconFont
                    style={{ fontSize: 16 }}
                    type={theme === "dark" ? "icon-sun-light" : "icon-moon"}
                  />
                }
                onClick={() => {
                  changeTheme(theme === "dark" ? "light" : "dark");
                }}></Button>
              {/* 头像 */}
              <Dropdown
                menu={{ items: options, onClick: dropdownSelect }}
                trigger={["hover"]}>
                <Avatar src="https://hooks.spicyboy.cn/assets/png/avatar-4ef6186b.png"></Avatar>
              </Dropdown>
            </Space>
          </div>
        </Header>
        {/* 内容区 */}
        <Content
          className="layout-page-content"
          style={{ color: token.colorText }}>
          <Outlet />
        </Content>
        {/* 底部 */}
        <Footer
          className="layout-page-footer"
          style={{ color: token.colorTextDescription }}>
          React Admin
        </Footer>
      </Layout>
    </Layout>
  );
}
