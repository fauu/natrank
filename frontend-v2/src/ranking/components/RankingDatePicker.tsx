import { debounce } from "lodash";
import { action } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";
import * as NumericInput from "react-numeric-input";

import { ViewStore } from "app/ViewStore";
import { MonthInput } from "common/components/MonthInput";
import { areDatesEqual } from "common/DateUtils";

enum DatePickerField {
  Day,
  Month,
  Year ,
}

interface IRankingDatePickerProps {
  readonly viewStore: ViewStore;
}

const debounceMs = 500;

function RankingDatePicker({ viewStore }: IRankingDatePickerProps): JSX.Element {
  const date = viewStore.selectedRankingDate;

  const dayInputProps = {
    max: 31,
    maxLength: 2,
    min: 1,
    onChange: debounce(handleChange(DatePickerField.Day, viewStore), debounceMs),
    size: 2,
    style: false,
    value: date.getDate(),
  };

  const monthInputProps = {
    initialValue: date.getMonth() + 1,
    onChange: debounce(handleChange(DatePickerField.Month, viewStore), debounceMs),
  };

  const yearInputProps = {
    onChange: debounce(handleChange(DatePickerField.Year, viewStore), debounceMs),
    size: 4,
    style: false,
    value: date.getFullYear(),
  };

  return (
    <div className="ranking-date-picker">
      <NumericInput {...dayInputProps} />
      <MonthInput {...monthInputProps} />
      <NumericInput {...yearInputProps} />
    </div>
  );
}

const handleChange = (field, viewStore) => action((newValue) => {
  const previousDate = viewStore.selectedRankingDate;
  const newDate = new Date(previousDate);

  switch (field) {
    case DatePickerField.Day:
      newDate.setDate(Number(newValue));
      break;

    case DatePickerField.Month:
      newDate.setMonth(Number(newValue) - 1);
      break;

    case DatePickerField.Year:
      newDate.setFullYear(Number(newValue));
      break;
  }

  if (!areDatesEqual(newDate, previousDate)) {
    viewStore.selectedRankingDate = newDate;
  }
});

const rankingDatePicker = observer(RankingDatePicker);
export { rankingDatePicker as RankingDatePicker };
