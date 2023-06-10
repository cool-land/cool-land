import { BrowserRouter } from "react-router-dom";

import Router from "./router";
import AuthRouter from "./router/utils/AuthRouter";

const App = () => {
  return (
    // <ConfigProvider
    //   theme={{
    //     algorithm: [theme.darkAlgorithm],
    //     token: { colorPrimary: "#1890ff" },
    //   }}
    //   componentSize={"middle"}>
    <BrowserRouter>
      <AuthRouter>
        <Router />
      </AuthRouter>
    </BrowserRouter>

    // </ConfigProvider>
  );
};

export default App;
