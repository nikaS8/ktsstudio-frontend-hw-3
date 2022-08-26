import React from "react";
import "./CheckBox.css";

type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange"
> & {
  /** Вызывается при клике на чекбокс */
  value?: string;
  checked?: boolean;
  onChange: (value: boolean) => void;
  type?: string;
  disabled?: boolean;
};

export const CheckBox: React.FC<CheckBoxProps> = ({
  value,
  checked,
  onChange,
  type = "checkbox",
  disabled,
  ...rest
}) => {
  const [val, setVal] = React.useState(checked);
  return (
    <input
      {...rest}
      className={"checkbox"}
      value={value}
      type={type}
      checked={val}
      disabled={disabled}
      onChange={(e) => {
        onChange(e.target.checked);
        setVal(!val);
      }}
    />
  );
};
