import { Button } from "antd";
import { useNavigate, useRouteError } from "react-router-dom";
import NoAccess from "./403";
import NotFound from "./404";
import NetError from "./500";

const ErrorPage = () => {
  const navigate = useNavigate();
  const error: any = useRouteError();
  console.log("error: ", error);

  const Extra = () => {
    return (
      <Button
        type="primary"
        onClick={() => {
          navigate("/home");
        }}>
        回到首页
      </Button>
    );
  };
  const ErrorResult = () => {
    switch (error.status) {
      case 403:
        return <NoAccess extra={<Extra />} />;
      case 404:
        return <NotFound />;
      default:
        return <NetError error={error} extra={<Extra />} />;
    }
  };
  return (
    <div>
      <ErrorResult />
    </div>
  );
};

export default ErrorPage;
