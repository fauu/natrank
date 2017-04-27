import * as React from 'react';
import { Debounce } from 'react-throttle';
import * as NumericInput from 'react-numeric-input';
import { MonthInput } from './MonthInput';

enum DatePickerField {
  Day,
  Month,
  Year 
}

interface DatePickerProps {
  initialDate: Date;
  onChange
}

export class DatePicker extends React.Component<DatePickerProps, any> {

  selectedDate: Date = new Date();

  render() {
    const initialDate = this.props.initialDate;
    const dateFragments = initialDate.toISOString().substring(0, 10).split('-');

    const day = Number(dateFragments[2]);
    const month = Number(dateFragments[1]);
    const year = Number(dateFragments[0]);

    this.selectedDate.setDate(day);
    this.selectedDate.setMonth(month - 1)
    this.selectedDate.setFullYear(year);

    const dayInputProps = {
      style: false,
      size: 2,
      maxLength: 2,
      min: 1,
      max: 31,
      value: day,
      onChange: this.handleChange(DatePickerField.Day)
    }

    const monthInputProps = {
      initialValue: month,
      onChange: this.handleChange(DatePickerField.Month)
    }

    const yearInputProps = {
      style: false,
      size: 4,
      min: 1872,
      max: 2017,
      value: year,
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