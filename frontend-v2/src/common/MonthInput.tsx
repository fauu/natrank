import { action, reaction, observable } from 'mobx';
import { observer } from 'mobx-react';
import { Icon } from './Icon';
import * as React from 'react';

interface MonthInputProps {
  initialValue: number,
  onChange
}

@observer
export class MonthInput extends React.Component<MonthInputProps, any> {

  static readonly months: string[] = [ 'January', 'February', 'March', 'April', 'May', 'June', 'July',
                                       'August', 'September', 'October', 'November', 'December' ];
  static readonly minMonth = 1;
  static readonly maxMonth = MonthInput.months.length;

  @observable value: number;

  @action
  componentWillMount() {
    this.value = this.props.initialValue;
  }

  render() {
    return (
      <span className="month-input">
        <b className="month-input__control" onClick={this.handlePlusControlClick.bind(this)}>
          <Icon name="plus-box" />
        </b>

        <select className="month-input__select"
                value={this.value} onChange={this.handleSelectChange.bind(this)}>
                
          {MonthInput.months.map((monthName, idx) => {
            return (<option value={idx + 1} key={idx}>{monthName}</option>);
          })};

        </select>

        <b className="month-input__control" onClick={this.handleMinusControlClick.bind(this)}>
          <Icon name="minus-box" />
        </b>
      </span>
    );
  }

  @action
  handlePlusControlClick() {
    if (this.value < MonthInput.maxMonth) {
      this.value = this.value + 1;
    }
  }

  @action
  handleMinusControlClick() {
    if (this.value > MonthInput.minMonth) {
      this.value = this.value - 1;
    }
  }

  @action
  handleSelectChange(event) {
    this.value = event.target.value;
  };

  handleValueChange = reaction(
    () => this.value,
    (value) => {
      this.props.onChange(value);
    }
  );

}