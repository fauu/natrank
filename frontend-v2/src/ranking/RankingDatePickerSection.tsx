import * as React from "react";
import { DatePicker } from "../common/DatePicker";
import { RankingStore } from "./RankingStore";

interface IRankingDatePickerSectionProps {
  initialDate: Date;
  onDateChange;
}

export class RankingDatePickerSection extends React.Component<IRankingDatePickerSectionProps, {}> {

  public render() {
    const initialDate = this.props.initialDate;

    if (initialDate) {
      return (
        <DatePicker
          minYear={1873} // TODO: Get from the API
          value={this.props.initialDate}
          onChange={this.props.onDateChange}
        />
      );
    }

    return null;
  }

}
