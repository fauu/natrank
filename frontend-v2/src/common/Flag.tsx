import * as React from 'react';

interface FlagProps {
  code?: string;
  className?: string;
}

export class Flag extends React.Component<FlagProps, any> {

  render() {
    let params = {
      src: require("../../resources/images/flags/" + this.props.code + ".png"),
      className: this.props.className
    }

    return <img {...params} />;
  }

}