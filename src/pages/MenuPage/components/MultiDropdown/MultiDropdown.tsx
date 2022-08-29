import React from 'react'

import styles from './MultiDropdown.module.scss'

export type Option = {
  key: string
  value: string
}

export type MultiDropdownProps = {
  options: Option[]
  value: Option[]
  onChange: (value: Option[]) => void
  disabled?: boolean
  pluralizeOptions: (value: Option[]) => string
}

export const MultiDropdown: React.FC<MultiDropdownProps> = ({
                                                              options,
                                                              value,
                                                              onChange,
                                                              disabled,
                                                              pluralizeOptions,
                                                            }) => {
  const [isClicked, setIsClicked] = React.useState(false)

  const handleClick = (option: Option) => {
    let newVal: Option[] = []
    if (value.some((el) => el.key === option.key)) {
      newVal = value.filter((el) => el.key !== option.key)
    } else {
      newVal = [...value, option]
    }
    onChange(newVal)
  }

  return (
    <div className={styles.dropdown}>
      <input
        className={styles.dropdown_button}
        type='button'
        value={pluralizeOptions(value)}
        onClick={() => setIsClicked(!isClicked)}
      />
      {isClicked &&
      !disabled &&
      options.map((option) => {
        return (
          <input
            className={styles.dropdown_item}
            type='button'
            key={option.key}
            value={option.value}
            onClick={() => handleClick(option)}
          />
        )
      })}
    </div>
  )
}
