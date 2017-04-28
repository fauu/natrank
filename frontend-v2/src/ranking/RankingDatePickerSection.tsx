import { action } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { RankingStore } from './RankingStore';
import { DatePicker } from '../common/DatePicker'

interface RankingDatePickerSectionProps {
  rankingStore?: RankingStore;
}

@inject('rankingStore')
@observer
export class RankingDatePickerSection extends React.Component<RankingDatePickerSectionProps, {}> {

  render() {
    const initialDate = this.props.rankingStore.initialDate;

    return ( 
      initialDate
      ? <DatePicker minYear={1873} // TODO: Get from the API
                    value={new Date(initialDate)} 
                    onChange={this.handleDateChange} />
      : null
    )
  }

  @action
  handleDateChange = (newValue: Date) => {
    this.props.rankingStore.selectedDate = new Date(newValue);
  }

}