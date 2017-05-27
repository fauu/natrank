import { action, observable, reaction } from "mobx";
import * as React from "react";
import * as NumericInput from "react-numeric-input";

import { _b } from "common/BemHelper";
import { Icon } from "common/components/Icon";
import { observer } from "mobx-react";
import { ResultsViewStore } from "results/ResultsViewStore";

interface IResultsYearFilterProps {
  readonly viewStore: ResultsViewStore;
  readonly onYearEntry: (year: number) => void;
}

const b = _b("results-year-filter");

@observer
export class ResultsYearFilter extends React.Component<IResultsYearFilterProps, void> {

  private viewStore: ResultsViewStore;

  @observable
  private value: number | undefined;

  @observable
  private isFocused: boolean;

  private inputRef: HTMLInputElement;

  private handleClearButtonClick = action(() => {
    this.value = undefined;
  });

  private handleInputChange = action((newValue: number | null) => {
    this.value = newValue || undefined;
  });

  private handleInputFocus = action(() => {
    this.isFocused = true;
  });

  private handleInputBlur = action(() => {
    this.isFocused = false;
  });

  public componentWillMount() {
    this.viewStore = this.props.viewStore;
    action(() => this.value = this.viewStore.state.year)();

    reaction(
      () => this.value,
      (value) => this.handleValueChange(value),
    );
  }

  public componentDidMount() {
    this.inputRef.placeholder = "Year";
    this.inputRef.addEventListener("focus", this.handleInputFocus);
    this.inputRef.addEventListener("blur", this.handleInputBlur);
  }

  public render() {
    const clearButton = this.value && (
      <span className={b("clear-button")()} onClick={this.handleClearButtonClick}>
        <Icon name="close" />
      </span>
    );

    return (
      <label className={b()}>
        <div className={b("input-container", { focused: this.isFocused })}>
          <NumericInput
            maxLength={4}
            onChange={this.handleInputChange}
            style={false}
            value={this.value ? this.value : ""}
            className={b("input")()}
            ref={this.getInputRef}
          />
          {clearButton}
        </div>
      </label>
    );
  }

  private getInputRef = (ref) => {
    if (ref) {
      this.inputRef = ref.refs.input;
    }
  }

  private handleValueChange = (newValue: number) => {
    if (!newValue || newValue > 1000) {
      this.props.onYearEntry(newValue);
    }
  }

}
