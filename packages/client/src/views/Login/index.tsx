import { getRoutesApi } from "@/apis";
import { useBoundStore } from "@/store";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, FormProps, Input, message, Typography } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.scss";

const Login = () => {
  const { Title } = Typography;
  const [loading, setLoading] = useState<boolean>(false);
  const [initRoutes, initBreadcrumb] = useBoundStore((state) => [
    state.initRoutes,
    state.initBreadcrumb,
  ]);
  const navigate = useNavigate();

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
    <div className="main-box">
      <div className="login-box">
        <div className="title">
          <Title>管理系统</Title>
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
      <div className="footer">底部</div>
    </div>
  );
};

export default Login;
