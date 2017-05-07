import { Icon } from "common/components/Icon";
import { action, observable, reaction } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";

interface IMonthInputProps {
  initialValue: number;
  onChange;
}

@observer
export class MonthInput extends React.Component<IMonthInputProps, any> {

  public static readonly months: string[] =
    [ "January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December" ];

  private static readonly minMonth = 1;
  private static readonly maxMonth = MonthInput.months.length;

  public handlePlusControlClick = action(() => {
    if (this.value < MonthInput.maxMonth) {
      this.value = this.value + 1;
    }
  });

  public handleMinusControlClick = action(() => {
    if (this.value > MonthInput.minMonth) {
      this.value = this.value - 1;
    }
  });

  public handleSelectChange = action((event: React.FormEvent<HTMLSelectElement>) => {
    this.value = Number(event.currentTarget.value);
  });

  public handleValueChange = reaction(
    () => this.value,
    (value) => {
      this.props.onChange(value);
    },
  );

  @observable private value: number;

  @action
  public componentDidMount() {
    this.value = this.props.initialValue;
  }

  public render() {
    const optionTags =
      MonthInput.months.map((monthName, idx) => (
        <option value={idx + 1} key={idx}>
          {monthName}
        </option>
      ));

    return (
      <span className="month-input">
        <b className="month-input__control" onClick={this.handlePlusControlClick}>
          <Icon name="plus-box" />
        </b>

        <select
          className="month-input__select"
          value={this.value}
          onChange={this.handleSelectChange}
        >
          {optionTags}
        </select>

        <b className="month-input__control" onClick={this.handleMinusControlClick}>
          <Icon name="minus-box" />
        </b>
      </span>
    );
  }

}
