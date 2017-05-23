/* tslint:disable */
import { debounce } from "lodash";
import { action } from "mobx";
import * as React from "react";
import * as NumericInput from "react-numeric-input";

import { ViewStore } from "app/ViewStore";
import { MonthInput } from "common/components/MonthInput";

enum DatePickerField {
  Day,
  Month,
  Year ,
}

interface IDatePickerProps {
  readonly viewStore: ViewStore;
}

export class DatePicker extends React.Component<IDatePickerProps, {}> {

  private static readonly debounceMs = 500;

  private viewStore = this.props.viewStore;

  private handleChange = (field) => action((newValue) => {
    const date = new Date(this.viewStore.selectedRankingDate);
    switch (field) {
      case DatePickerField.Day:
        if (newValue === date.getDate()) return;
        date.setDate(Number(newValue));
        break;
      case DatePickerField.Month:
        if (Number(newValue) - 1 === date.getMonth()) return;
        date.setMonth(Number(newValue) - 1);
        break;
      case DatePickerField.Year:
        if (Number(newValue) === date.getFullYear()) return;
        date.setFullYear(Number(newValue));
        break;
    }
    this.viewStore.selectedRankingDate = date;
  })

  public render() {
    const dayInputProps = {
      max: 31,
      maxLength: 2,
      min: 1,
      onChange: debounce(this.handleChange(DatePickerField.Day), DatePicker.debounceMs),
      size: 2,
      style: false,
      value: this.viewStore.selectedRankingDate.getDate(),
    };

    const monthInputProps = {
      initialValue: this.viewStore.selectedRankingDate.getMonth() + 1,
      onChange: debounce(this.handleChange(DatePickerField.Month), DatePicker.debounceMs),
    };

    const yearInputProps = {
      onChange: debounce(this.handleChange(DatePickerField.Year), DatePicker.debounceMs),
      size: 4,
      style: false,
      value: this.viewStore.selectedRankingDate.getFullYear(),
    };

    return (
      <div className="ranking-date-picker">
        <NumericInput {...dayInputProps} />
        <MonthInput {...monthInputProps} />
        <NumericInput {...yearInputProps} />
      </div>
    );
  }

}
