import { Result } from "antd";
import { CSSProperties, ReactNode } from "react";

const NetError = ({ error, extra }: { error: any; extra: ReactNode }) => {
  const style: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };
  return (
    <div>
      <Result
        status="500"
        subTitle={
          <div style={style}>
            <span>网络错误</span>
            <span>
              <i>{error.statusText || error.message || error.msg}</i>
            </span>
          </div>
        }
        extra={extra}
      />
    </div>
  );
};
export default NetError;
