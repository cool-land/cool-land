import { Result } from "antd";
import { ReactNode } from "react";

// 无权限
const NoAccess = ({ extra }: { extra: ReactNode }) => {
  return <Result status="403" subTitle="无权限" extra={extra} />;
};

export default NoAccess;
