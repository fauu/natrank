import * as React from 'react';

interface IconProps {
  name?: string;
}

export class Icon extends React.Component<IconProps, any> {

  render() {
    let className = 'fa fa-' + this.props.name;

    return <i className={className} aria-hidden="true"></i>
  }

}