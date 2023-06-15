import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const Menu1 = () => {
  const navigate = useNavigate();
  return (
    <div>
      <p>菜单一</p>
      <Button
        onClick={() => {
          navigate("/menu/menu1/123/detail");
        }}>
        详情
      </Button>
    </div>
  );
};

export default Menu1;
