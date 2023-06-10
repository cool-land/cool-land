import { Spin } from "antd";
import { FC } from "react";

const Loading: FC = () => {
  return (
    <Spin
      size="large"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
      }}
    />
  );
};

export default Loading;
