import * as React from "react";

interface IFlagProps {
  readonly className?: string;
  readonly code: string;
  readonly large?: boolean;
}

export function Flag({ className, code, large }: IFlagProps): JSX.Element {
  const largePathModifier = large ? "large/" : "";

  const imgProps = {
    className,
    src: require(`images/flags/${largePathModifier}${code}.png`),
  };

  return <img {...imgProps} />;
}
