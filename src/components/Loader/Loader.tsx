import React from 'react'

import classNames from 'classnames'

import styles from './Loader.module.scss'

export enum LoaderSize {
  s = 's',
  m = 'm',
  l = 'l',
}

export type LoaderProps = {
  loading?: boolean
  size?: LoaderSize
  className?: string
}

export const Loader: React.FC<LoaderProps> = ({
                                                loading,
                                                size = LoaderSize.m,
                                                className,
                                              }) => {
  const loaderClass = classNames(styles[`loader_size-${size}`], className)
  return loading ? <div className={loaderClass} /> : null
}
