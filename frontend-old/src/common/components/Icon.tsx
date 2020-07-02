import * as React from "react";

interface IIconProps {
  readonly name?: string;
  readonly className?: string;
}

export function Icon({ name, className }: IIconProps): JSX.Element {
  return <i className={`mdi mdi-${name} ${className}`} />;
}
