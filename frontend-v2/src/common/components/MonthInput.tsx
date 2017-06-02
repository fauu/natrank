import { action, observable, reaction } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";

import { _b } from "common/BemHelper";
import { Icon } from "common/components/Icon";

interface IMonthInputProps {
  readonly initialValue: number;
  readonly onChange;
}

const b = _b("month-input");

@observer
export class MonthInput extends React.Component<IMonthInputProps, any> {

  public static readonly months: string[] =
    [ "January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December" ];

  private static readonly minMonth = 1;
  private static readonly maxMonth = MonthInput.months.length;

  private handlePlusControlClick = action(() => {
    if (this.value < MonthInput.maxMonth) {
      this.value = this.value + 1;
    }
  });

  private handleMinusControlClick = action(() => {
    if (this.value > MonthInput.minMonth) {
      this.value = this.value - 1;
    }
  });

  private handleSelectChange = action((event: React.FormEvent<HTMLSelectElement>) => {
    this.value = Number(event.currentTarget.value);
  });

  private handleValueChange = reaction(
    () => this.value,
    (value) => {
      this.props.onChange(value);
    },
  );

  @observable
  private value;

  public componentWillMount() {
    this.setValue(this.props.initialValue);
  }

  public componentWillReceiveProps(props: IMonthInputProps) {
    this.setValue(props.initialValue);
  }

  @action
  public setValue(value: number) {
    this.value = value;
  }

  public render() {
    const optionTags =
      MonthInput.months.map((monthName, idx) => (
        <option value={idx + 1} key={idx}>
          {monthName}
        </option>
      ));

    return (
      <span className={b}>
        <b className={b("control")} onClick={this.handlePlusControlClick}>
          <Icon name="plus" />
        </b>

        <select
          className={b("select")}
          value={this.value}
          onChange={this.handleSelectChange}
        >
          {optionTags}
        </select>

        <b className={b("control")} onClick={this.handleMinusControlClick}>
          <Icon name="minus" />
        </b>
      </span>
    );
  }

}
