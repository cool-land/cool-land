import * as AntIcon from "@ant-design/icons";
import { ReactNode } from "react";

type Props = {
  type?: string;
};
export const Icon: FC<Props> = (props: { type: string | number }) => {
  if (props.type) {
    const MyIcon: ReactNode = AntIcon[props.type];
    return <MyIcon />;
  } else {
    return <></>;
  }
};

export const IconFont = AntIcon.createFromIconfontCN({
  scriptUrl: ["//at.alicdn.com/t/c/font_2336614_fr949zaey9u.js"],
});
