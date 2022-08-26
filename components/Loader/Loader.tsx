import React from "react";
import "./Loader.css";

export enum LoaderSize {
  s = "s",
  m = "m",
  l = "l",
}

export type LoaderProps = {
  loading?: boolean;
  size?: LoaderSize;
  className?: string;
};

export const Loader: React.FC<LoaderProps> = ({
  loading = true,
  size = LoaderSize.m,
  className,
}) => {
  let sizeLoader = `loader_size-${size}`;
  return loading ? <div className={`${className} ${sizeLoader}`}> </div> : null;
};
