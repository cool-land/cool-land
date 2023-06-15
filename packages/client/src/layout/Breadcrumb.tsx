import { useBreadcrumb } from "@/hooks/useBreadcrumb";
import { Breadcrumb } from "antd";

// 面包屑
const BreadcrumbView = () => {
  const breadcrumbList = useBreadcrumb();
  const breadcrumbs = breadcrumbList.map((item) => {
    return {
      key: item.path,
      title: item.label,
    };
  });
  return (
    <div className="breadcrumb">
      <Breadcrumb items={breadcrumbs}></Breadcrumb>
    </div>
  );
};

export default BreadcrumbView;
