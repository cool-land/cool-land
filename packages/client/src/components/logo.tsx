import logo from "@/assets/icons/react.svg";

const Logo = ({ collapsed }: { collapsed: boolean }) => {
  return (
    <div className="sider-header">
      {collapsed ? (
        <img src={logo} alt="logo" className="logo" />
      ) : (
        <h2 className="title">ReactAdmin</h2>
      )}
    </div>
  );
};

export default Logo;
