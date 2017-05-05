import * as React from 'react';
import * as classNames from 'classnames';

interface IconProps {
  name?: string;
  className?: string;
}

export class Icon extends React.Component<IconProps, any> {

  render() {
    let className = classNames('mdi', `mdi-${this.props.name}`, this.props.className);

    return <i className={className}></i>
  }

}