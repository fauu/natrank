import * as React from "react";

interface IFlagProps {
  code?: string;
  className?: string;
}

export class Flag extends React.Component<IFlagProps, any> {

  public render() {
    const params = {
      className: this.props.className,
      src: require("../../resources/images/flags/" + this.props.code + ".png"),
    };

    return <img {...params} />;
  }

}
