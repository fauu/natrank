import * as React from 'react';
import { inject, observer } from 'mobx-react';
import { DatePicker } from './DatePicker';
import { RankingStore } from './RankingStore';
import { RankingTable } from './RankingTable';

interface RankingPageProps {
  rankingStore?: RankingStore;
}

@inject('rankingStore')
@observer
export class RankingPage extends React.Component<RankingPageProps, any> {

  render() {
    return (
      <div className="ranking-page">
        <DatePicker />
        <RankingTable />
      </div>
    );
  }

}