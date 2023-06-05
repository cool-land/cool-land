declare module "*.less" {
  const style: any;
  export default style;
}
declare module "*.scss" {
  const style: any;
  export default style;
}
declare module "*.svg" {
  import { FunctionComponent, SVGProps } from "react";

  export const ReactComponent: FunctionComponent<
    SVGProps<SVGSVGElement> & { title?: string }
  >;
}

declare module "*.css";
declare module "*.less";
declare module "*.sass";
// declare module "*.svg";
declare module "*.webp";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.bmp";
declare module "*.tiff";
declare module "faker";
