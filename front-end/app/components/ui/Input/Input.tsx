import { InputProps } from "./Input.props";
import styles from "./Input.module.scss";
import cn from "classnames";

export const Input = ({ className, ...props }: InputProps) => {
  return (
    <div>
      <input className={cn(className, styles.input)} {...props} />
    </div>
  );
};
