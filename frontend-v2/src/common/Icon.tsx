import * as React from 'react';
import * as classNames from 'classnames';

interface IconProps {
  name?: string;
  className?: string;
}

export class Icon extends React.Component<IconProps, any> {

  render() {
    let className = classNames('fa', `fa-${this.props.name}`, this.props.className);

    return <i className={className} aria-hidden="true"></i>
  }

}