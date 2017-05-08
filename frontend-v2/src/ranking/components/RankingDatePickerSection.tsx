import { DatePicker } from "common/components/DatePicker";
import { FadeTransition } from "common/components/FadeTransition";
import { RankingStore } from "ranking/RankingStore";
import * as React from "react";

interface IRankingDatePickerSectionProps {
  initialDate: Date;
  onDateChange;
}

export class RankingDatePickerSection extends React.Component<IRankingDatePickerSectionProps, {}> {

  public render() {
    const initialDate = this.props.initialDate;

    const datePicker = (
      <div key="date-picker">
        <DatePicker
          minYear={1873} // TODO: Get from the API
          value={this.props.initialDate}
          onChange={this.props.onDateChange}
        />
      </div>
    );

    return (
      <FadeTransition>
        {initialDate && datePicker}
      </FadeTransition>
    );
  }

}
