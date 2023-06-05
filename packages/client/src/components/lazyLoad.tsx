// 导入模块

import { lazy, Suspense } from "react";
import Loading from "./loading";

const modules = import.meta.glob("../views/**/index.tsx");
// const modules = import.meta.glob("../views/**/index.tsx") as Record<
//   string,
//   any
// >;
// 懒加载
// const LazyLoad = ({ modulePath }: { modulePath: string }) => {
const lazyLoad = (modulePath: string) => {
  const Module = lazy(modules[`../views/${modulePath}.tsx`] as any);
  // const Module = lazy(() => import(`../views/Home/index`));
  console.log("Module: ", Module);
  console.log("modules: ", modules);
  // console.log("modulePath: ", modulePath);

  // return <Home />;
  return (
    <Suspense fallback={<Loading />}>
      <Module />
    </Suspense>
  );
};
``;

export default lazyLoad;
