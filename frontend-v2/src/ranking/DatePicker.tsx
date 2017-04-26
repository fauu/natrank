import * as React from 'react';
import { action } from 'mobx';
import { inject, observer } from 'mobx-react';
import { Debounce } from 'react-throttle';
import * as NumericInput from 'react-numeric-input';
import { RankingStore } from './RankingStore';
import { MonthInput } from './MonthInput';

interface DatePickerProps {
  rankingStore?: RankingStore;
}

@inject('rankingStore')
@observer
export class DatePicker extends React.Component<DatePickerProps, any> {

  selectedDate: Date = new Date();

  renderDayInput(value: number) { 
    return (
      <Debounce time="500" handler="onChange">
        <NumericInput size={2} maxLength={2} min={1} max={31} value={value}
                      onChange={this.handleDayChange} style={false} />
      </Debounce>
    )
  }

  renderYearInput(value: number) { 
    return (
      <Debounce time="500" handler="onChange">
        <NumericInput size={4} min={1872} max={2017} value={value} 
                      onChange={this.handleYearChange} style={false}/>
      </Debounce>
    )
  }

  render() {
    const initialDate = this.props.rankingStore.latestRankingDate;

    if (initialDate) {
      let dateFragments = initialDate.toISOString().substring(0, 10).split('-');
      let day = Number(dateFragments[2]);
      let month = Number(dateFragments[1]);
      let year = Number(dateFragments[0]);

      this.selectedDate.setDate(day);
      this.selectedDate.setMonth(month - 1)
      this.selectedDate.setFullYear(year);

      return (
        <div className='ranking-date-picker'>
          {this.renderDayInput(day)}
          <MonthInput initialValue={month} onChange={this.handleMonthChange} />
          {this.renderYearInput(year)}
        </div>
      )
    } else {
      return <div></div>
    }
  };

  handleDayChange = (newValue) => {
    this.selectedDate.setDate(Number(newValue));
    this.propagateDateSelection();
  }

  handleMonthChange = (newValue) => {
    this.selectedDate.setMonth(Number(newValue) - 1);
    this.propagateDateSelection();
  }

  handleYearChange = (newValue) => {
    this.selectedDate.setFullYear(Number(newValue));
    this.propagateDateSelection();
  }

  @action
  propagateDateSelection() {
    this.props.rankingStore.selectedDate = new Date(this.selectedDate);
  }

}