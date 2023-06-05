import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button } from "antd";

const CollapsedButton = ({
  collapsed,
  collapse,
}: {
  collapsed: boolean;
  collapse: (payload: boolean) => void;
}) => {
  return (
    <>
      {!collapsed ? (
        <Button
          type="text"
          icon={
            <MenuFoldOutlined style={{ fontSize: "16px" }}></MenuFoldOutlined>
          }
          onClick={() => {
            collapse(true);
          }}></Button>
      ) : (
        <Button
          type="text"
          icon={
            <MenuUnfoldOutlined
              style={{ fontSize: "16px" }}></MenuUnfoldOutlined>
          }
          onClick={() => {
            collapse(false);
          }}></Button>
      )}
    </>
  );
};

export default CollapsedButton;
