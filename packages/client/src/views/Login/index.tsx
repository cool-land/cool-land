import { getRoutesApi } from "@/apis";
import { IconFont } from "@/components/icon";
import { useBoundStore } from "@/store";
import LoginBg from "@/views/Login/components/LoginBg";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  FormProps,
  Input,
  message,
  Space,
  theme,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";

const Login = () => {
  const { Title } = Typography;
  const { token } = theme.useToken();
  const [style, setStyle] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [initRoutes, initBreadcrumb] = useBoundStore((state) => [
    state.initRoutes,
    state.initBreadcrumb,
  ]);
  const [themeType, changeTheme] = useBoundStore((state) => [
    state.theme,
    state.changeTheme,
  ]);
  const navigate = useNavigate();

  // 根据不同的主题 设置不同的登录框样式
  useEffect(() => {
    if (themeType === "dark") {
      setStyle({
        background: "rgba(89, 89, 89, 0.25)",
      });
    } else {
      setStyle({
        background: "rgba(255, 255, 255, 0.25)",
        boxShadow: "rgba(142, 142, 142, 0.19) 0 6px 15px 0",
      });
    }
  }, [themeType]);

  // 提交表单
  const onFinished: FormProps["onFinish"] = async (values) => {
    setLoading(true);
    // const { code, data } = await login(values);
    const { code, data } = {
      code: 200,
      data: {
        token: "123456",
      },
    };
    if (code === 200) {
      // 存token
      localStorage.setItem("token", data.token);
      // 请求路由表
      const routes = await getRoutesApi();
      // 保存路由表到store
      initRoutes(routes);
      // 创建面包屑表
      initBreadcrumb(routes);
      message.success("登录成功");
      // 跳转到首页
      navigate("/");
    } else {
      message.error("登录失败");
    }
    setLoading(false);
  };

  return (
    <div className="main-box" style={{ background: token.colorBgContainer }}>
      <header className="header">
        <Space>
          <Button
            type="text"
            icon={
              <IconFont
                style={{ fontSize: 16 }}
                type={themeType === "dark" ? "icon-sun-light" : "icon-moon"}
              />
            }
            onClick={() => {
              changeTheme(themeType === "dark" ? "light" : "dark");
            }}></Button>
        </Space>
      </header>
      <div className="login-box" style={style}>
        <div className="title">
          <Title level={2} style={{ color: token.colorText }}>
            管理系统
          </Title>
        </div>
        <Form
          className="form"
          onFinish={onFinished}
          initialValues={{
            account: "admin",
            password: "123456",
          }}>
          <Form.Item
            name={"account"}
            rules={[{ required: true, message: "请输入账号" }]}>
            <Input
              prefix={<UserOutlined />}
              size={"large"}
              placeholder={"account: admin"}
            />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "密码" }]}
            name={"password"}>
            <Input.Password
              prefix={<LockOutlined />}
              size={"large"}
              placeholder={"password"}
            />
          </Form.Item>
          <Form.Item>
            <Button
              block
              htmlType="submit"
              type="primary"
              size="large"
              loading={loading}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
      <footer className="footer">
        <LoginBg />
      </footer>
    </div>
  );
};

export default Login;
