import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      subTitle="Not Found"
      extra={
        <Button
          type="primary"
          onClick={() => {
            navigate("/home");
          }}>
          返回首页
        </Button>
      }
    />
  );
};

export default NotFound;
