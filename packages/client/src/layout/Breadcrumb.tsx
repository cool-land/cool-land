import { useBreadcrumb } from "@/hooks/useBreadcrumb";
import { Breadcrumb } from "antd";
import { Link } from "react-router-dom";

// 面包屑
const BreadcrumbView = () => {
  const breadcrumbList = useBreadcrumb();
  console.log("breadcrumbList: ", breadcrumbList);
  const breadcrumbs = breadcrumbList.map((item) => {
    return {
      key: item.path,
      title: <Link to={item.path as string}>{item.label}</Link>,
    };
  });
  return (
    <div className="breadcrumb">
      <Breadcrumb items={breadcrumbs}></Breadcrumb>
    </div>
  );
};

export default BreadcrumbView;
