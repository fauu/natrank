import * as React from 'react';
import { action, observable } from 'mobx';
import { inject, observer } from 'mobx-react';

interface MonthInputProps {
  initialValue: number,
  onChange
}

@observer
export class MonthInput extends React.Component<MonthInputProps, any> {

  readonly months: string[] = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July',
                                'August', 'September', 'October', 'November', 'December' ];

  @observable value: number;

  componentWillMount() {
    this.value = this.props.initialValue;
  }

  render() {
    return (
      <select className='ranking-date-picker__input ranking-date-picker__input--month'
              value={this.value} onChange={this.handleChange.bind(this)}>
              
        {this.months.map((monthName, idx) => {
          return (<option value={idx + 1} key={idx}>{monthName}</option>)
        })};

      </select>
    )
  }

  @action
  handleChange(event) {
    this.value = event.target.value;
    this.props.onChange(this.value);
  };

}