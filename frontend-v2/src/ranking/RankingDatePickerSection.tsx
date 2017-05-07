import * as React from 'react';
import { RankingStore } from './RankingStore';
import { DatePicker } from '../common/DatePicker'

interface RankingDatePickerSectionProps {
  initialDate: Date;
  onDateChange;
}

export class RankingDatePickerSection extends React.Component<RankingDatePickerSectionProps, {}> {

  render() {
    return ( 
      this.props.initialDate
      ? <DatePicker minYear={1873} // TODO: Get from the API
                    value={this.props.initialDate} 
                    onChange={this.props.onDateChange} />
      : null
    )
  }

}