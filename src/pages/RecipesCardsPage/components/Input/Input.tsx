import React from "react";

import classNames from "classnames";

import logo from "../../../../assets/img/Frame.png";
import styles from "./Input.module.scss";

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  type?: string;
  className?: string;
  disabled?: boolean;
};

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  type = "text",
  className,
  disabled,
  ...rest
}) => {
  let inputCls = classNames(styles.input, className, {
    input_disabled: disabled,
  });
  return (
    <div className={styles.input_wrapper}>
      <svg
        className={styles.input_img}
        width="19"
        height="16"
        viewBox="0 0 19 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_7_793)">
          <path
            d="M9.04197 12.5C12.2625 12.5 14.8732 10.1495 14.8732 7.25C14.8732 4.35051 12.2625 2 9.04197 2C5.82146 2 3.21072 4.35051 3.21072 7.25C3.21072 10.1495 5.82146 12.5 9.04197 12.5Z"
            stroke="black"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M13.165 10.9624L16.5389 14"
            stroke="black"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_7_793">
            <rect
              x="0.989288"
              width="17.7714"
              height="16"
              rx="7"
              fill="white"
            />
          </clipPath>
        </defs>
      </svg>
      <input
        {...rest}
        placeholder={"Search"}
        value={value}
        type={type}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={inputCls}
      />
    </div>
  );
};
