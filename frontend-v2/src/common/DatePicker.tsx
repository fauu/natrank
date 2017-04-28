import * as React from 'react';
import { Debounce } from 'react-throttle';
import * as NumericInput from 'react-numeric-input';
import { DateUtils } from './DateUtils';
import { MonthInput } from './MonthInput';

enum DatePickerField {
  Day,
  Month,
  Year 
}

interface DatePickerProps {
  value: Date;
  minYear: number,
  onChange
}

// TODO: maxDate support
export class DatePicker extends React.Component<DatePickerProps, any> {

  selectedDate: Date;

  componentWillMount() {
    this.selectedDate = this.props.value;
  }

  render() {
    const dayInputProps = {
      style: false,
      size: 2,
      maxLength: 2,
      min: 1,
      max: 31,
      value: this.selectedDate.getDate(),
      onChange: this.handleChange(DatePickerField.Day)
    }

    const monthInputProps = {
      initialValue: this.selectedDate.getMonth() + 1,
      onChange: this.handleChange(DatePickerField.Month)
    }

    const yearInputProps = {
      style: false,
      size: 4,
      min: this.props.minYear,
      value: this.selectedDate.getFullYear(),
      onChange: this.handleChange(DatePickerField.Year)
    }

    return (
      <div className='ranking-date-picker'>

        <Debounce time="500" handler="onChange">
          <NumericInput {...dayInputProps} />
        </Debounce>

        <MonthInput {...monthInputProps} />

        <Debounce time="500" handler="onChange">
          <NumericInput {...yearInputProps} />
        </Debounce>

      </div>
    );
  };

  handleChange = (field) => (newValue) => {
    switch (field) {
      case DatePickerField.Day:
        this.selectedDate.setDate(Number(newValue));
        break;
      case DatePickerField.Month:
        this.selectedDate.setMonth(Number(newValue) - 1);
        break;
      case DatePickerField.Year:
        this.selectedDate.setFullYear(Number(newValue));
        break;
    }

    this.props.onChange(this.selectedDate);
  }

}