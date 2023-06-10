import * as AntdIcons from "@ant-design/icons";
import { FC } from "react";

type Props = {
  type?: string;
};

const allIcons: {
  [key: string]: any;
} = AntdIcons;

export const Icon: FC<Props> = (props) => {
  if (props.type) {
    const MyIcon = allIcons[props.type];
    return <MyIcon />;
  } else {
    return <></>;
  }
};

export const IconFont = AntdIcons.createFromIconfontCN({
  scriptUrl: ["//at.alicdn.com/t/c/font_2336614_fr949zaey9u.js"],
});
