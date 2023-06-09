import logo from "@/assets/icons/react.svg";
import { ThemeSlice } from "@/store/modules/themeSlice";

const Logo = ({
  collapsed,
  theme,
}: {
  collapsed: boolean;
  theme: ThemeSlice["theme"];
}) => {
  return (
    <div className="sider-header">
      {collapsed ? (
        <img src={logo} alt="logo" className="logo" />
      ) : (
        <h2
          className="title"
          style={{ color: theme === "dark" ? "#fff" : "#000" }}>
          ReactAdmin
        </h2>
      )}
    </div>
  );
};

export default Logo;
