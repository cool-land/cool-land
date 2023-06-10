import { useShallowBoundStore } from "@/store";
import { ConfigProvider, Spin, theme } from "antd";
import { Suspense, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./router";
import AuthRouter from "./router/utils/AuthRouter";

const App = () => {
  const [themeType, colorPrimary] = useShallowBoundStore((state) => [
    state.theme,
    state.primaryColor,
  ]);
  const [algorithm, setAlgorithm] = useState();

  useEffect(() => {
    const res: any = [];
    if (themeType === "dark") {
      res.push(theme.darkAlgorithm);
    }
    setAlgorithm(() => res);
  }, [themeType]);

  return (
    <Suspense fallback={<Spin />}>
      <ConfigProvider
        theme={{
          token: { colorPrimary },
          algorithm,
        }}>
        <BrowserRouter>
          <AuthRouter>
            <Router />
          </AuthRouter>
        </BrowserRouter>
      </ConfigProvider>
    </Suspense>
  );
};

export default App;
