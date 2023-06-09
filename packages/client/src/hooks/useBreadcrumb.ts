import { useShallowBoundStore } from "@/store";
import { Routes } from "@/types";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const useBreadcrumb = () => {
  const [breadcrumbList, setBreadcrumbList] = useState<Routes>([]);
  const { pathname } = useLocation();

  const breadcrumb = useShallowBoundStore((state) => state.breadcrumb);
  console.log("breadcrumb: ", breadcrumb);

  useEffect(() => {
    Object.keys(breadcrumb).map((key) => {
      if (new RegExp(`${key}`).test(pathname)) {
        setBreadcrumbList(breadcrumb[key]);
      }
    });
  }, [pathname]);

  return breadcrumbList;
};
