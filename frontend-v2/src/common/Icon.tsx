import * as React from 'react';

interface IconProps {
  name?: string;
}

export class Icon extends React.Component<IconProps, any> {

  private className: string = null;

  componentWillMount() {
    this.className = 'fa fa-' + this.props.name;
  }

  render() {
    return <i className={this.className} aria-hidden="true"></i>
  }

}