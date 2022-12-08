import { ButtonProps } from "./Button.props";
import styles from "./Button.module.scss";
import cn from "classnames";

export const Button = ({
  children,
  className,
  textColor = "white",
  backgroundcolor = "default",
  fontWeight = "normal",
  borderRadius = "m",
  fontSize = "l",
  boxShadow = "one",
  Icon,
  size = "fixed",
  iconPosition = "before text",
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(className, styles.button, {
        [styles.colorBlack]: textColor === "black",
        [styles.colorRegular]: textColor === "regular",
        [styles.colorBlue]: textColor === "blue",
        [styles.colorWhite]: textColor === "white",
        [styles.colorGreen]: textColor === "green",
        [styles.colorRed]: textColor === "red",
        [styles.backgroundDisabled]: backgroundcolor === "disabled",
        [styles.backgroundDefault]: backgroundcolor === "default",
        [styles.backgroundWhite]: backgroundcolor === "white",
        [styles.fontweightNormal]: fontWeight === "normal",
        [styles.fontweightBold]: fontWeight === "bold",
        [styles.fontsizeL]: fontSize === "l",
        [styles.fontsizeM]: fontSize === "m",
        [styles.borderRadiusM]: borderRadius === "m",
        [styles.borderRadiusL]: borderRadius === "l",
        [styles.boxshadowFour]: boxShadow === "four",
        [styles.boxshadowThree]: boxShadow === "three",
        [styles.boxshadowTwo]: boxShadow === "two",
        [styles.boxshadowOne]: boxShadow === "one",
        [styles.fixed]: size === "fixed",
        [styles.fill]: size === "fill",
      })}
      {...props}
    >
      {children}
    </button>
  );
};
