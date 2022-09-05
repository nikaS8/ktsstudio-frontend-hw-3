import React from 'react'

import styles from './MultiDropdown.module.scss'

export type Option = {
  key: string
  value: string
}

export type MultiDropdownProps = {
  options: Option[]
  value: Option | null
  onChange: (value: Option) => void
  disabled?: boolean
  pluralizeOptions: (value: Option | null) => string
}

export const MultiDropdown: React.FC<MultiDropdownProps> = ({
                                                              options,
                                                              value,
                                                              onChange,
                                                              disabled,
                                                              pluralizeOptions,
                                                            }) => {
  const [isClicked, setIsClicked] = React.useState(false)

  return (
    <div className={styles.dropdown}>
      <input
        className={styles['dropdown__btn']}
        type='button'
        value={pluralizeOptions(value)}
        onClick={() => setIsClicked(!isClicked)}
      />
      {isClicked &&
      !disabled &&
      options.map((option) => {
        return (
          <input
            className={styles['dropdown__item']}
            type='button'
            key={option.key}
            value={option.value}
            onClick={() => {
              onChange(option)
              setIsClicked(!isClicked)
            }}
          />
        )
      })}
    </div>
  )
}
