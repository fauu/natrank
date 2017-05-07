import { MonthInput } from "common/components/MonthInput";
import { DateUtils } from "common/DateUtils";
import { debounce } from "lodash";
import * as React from "react";
import * as NumericInput from "react-numeric-input";

enum DatePickerField {
  Day,
  Month,
  Year ,
}

interface IDatePickerProps {
  value: Date;
  minYear: number;
  onChange;
}

// TODO: maxDate support
export class DatePicker extends React.Component<IDatePickerProps, {}> {

  private static readonly debounceMs = 500;

  private selectedDate: Date;
  private initialChangeConsumed = false;

  public componentWillMount() {
    this.selectedDate = this.props.value;
  }

  public render() {
    const dayInputProps = {
      max: 31,
      maxLength: 2,
      min: 1,
      onChange: debounce(this.handleChange(DatePickerField.Day), DatePicker.debounceMs),
      size: 2,
      style: false,
      value: this.selectedDate.getDate(),
    };

    const monthInputProps = {
      initialValue: this.selectedDate.getMonth() + 1,
      onChange: debounce(this.handleChange(DatePickerField.Month), DatePicker.debounceMs),
    };

    const yearInputProps = {
      min: this.props.minYear,
      onChange: debounce(this.handleChange(DatePickerField.Year), DatePicker.debounceMs),
      size: 4,
      style: false,
      value: this.selectedDate.getFullYear(),
    };

    return (
      <div className="ranking-date-picker">
        <NumericInput {...dayInputProps} />
        <MonthInput {...monthInputProps} />
        <NumericInput {...yearInputProps} />
      </div>
    );
  }

  private handleChange = (field) => (newValue) => {
    if (!this.initialChangeConsumed) {
      this.initialChangeConsumed = true;
      return;
    }

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
