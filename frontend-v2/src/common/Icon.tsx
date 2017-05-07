import * as classNames from "classnames";
import * as React from "react";

interface IconProps {
  name?: string;
  className?: string;
}

export class Icon extends React.Component<IconProps, any> {

  public render() {
    const className = classNames("mdi", `mdi-${this.props.name}`, this.props.className);

    return <i className={className} />;
  }

}
