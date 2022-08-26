import React from "react";

import styles from "./MultiDropdown.module.scss";

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

export type MultiDropdownProps = {
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, массив может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Преобразовать выбранные значения в строку. Отображается в дропдауне в качестве выбранного значения */
  pluralizeOptions: (value: Option[]) => string;
};

export const MultiDropdown: React.FC<MultiDropdownProps> = ({
  options,
  value,
  onChange,
  disabled,
  pluralizeOptions,
}) => {
  const [isClicked, setIsClicked] = React.useState(false);

  const handleClick = (option: Option) => {
    let newVal: Option[] = [];
    if (value.some((el) => el.key === option.key)) {
      newVal = value.filter((el) => el.key !== option.key);
    } else {
      newVal = [...value, option];
    }
    onChange(newVal);
  };

  return (
    <div className={styles.dropdown}>
      <input
        className={styles.dropdown_button}
        type="button"
        value={pluralizeOptions(value)}
        onClick={() => setIsClicked(!isClicked)}
      />
      {isClicked &&
        !disabled &&
        options.map((option) => {
          return (
            // <div key={option.key} onClick={() => handleClick(option)}>
            //     {option.value}
            // </div>
            <input
              className={styles.dropdown_item}
              type="button"
              key={option.key}
              value={option.value}
              onClick={() => handleClick(option)}
            />
          );
        })}
    </div>
  );
};
