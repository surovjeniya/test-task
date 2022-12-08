import React, { ReactNode } from "react";
import { IconType } from "react-icons";

export interface ButtonProps extends React.ComponentPropsWithRef<"button"> {
  children: ReactNode;
  textColor?: "green" | "blue" | "black" | "regular" | "white" | "red";
  backgroundcolor?: "disabled" | "default" | "white";
  fontWeight?: "normal" | "bold";
  fontSize?: "m" | "l";
  borderRadius?: "m" | "l";
  boxShadow?: "one" | "two" | "three" | "four";
  Icon?: IconType | typeof React.Component;
  iconPosition?: "before text" | "after text" | "both";
  size?: "fixed" | "fill";
}
