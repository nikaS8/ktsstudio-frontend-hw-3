import "./Button.css";
import React from "react";

import { Loader } from "../Loader/Loader";

export enum ButtonColor {
  primary = "primary",
  secondary = "secondary",
}

export type ButtonProps = React.PropsWithChildren<{
  loading?: boolean;
  color?: ButtonColor;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  disabled?: boolean;
}> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
  loading = false,
  color = ButtonColor.primary,
  children,
  onClick,
  className,
  disabled,
  ...rest
}) => {
  let disableBtn = loading || disabled ? "button_disabled" : "";
  let colorProps = color && !disabled ? `button_color-${color}` : "";
  return (
    <button
      {...rest}
      onClick={!disabled && !loading ? onClick : () => {}}
      disabled={disabled || loading}
      className={`button ${colorProps} ${disableBtn} ${
        className ? className : ""
      }`}
    >
      {children}
      {loading && <Loader />}
    </button>
  );
};
