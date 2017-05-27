import * as React from "react";

interface IFlagProps {
  readonly className?: string;
  readonly code: string;
}

export function Flag({ className, code }: IFlagProps): JSX.Element {
    const imgProps = {
      className,
      src: require(`images/flags/${code}.png`),
    };

    return <img {...imgProps} />;
}
