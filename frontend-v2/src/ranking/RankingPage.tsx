import { action } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { paths } from '../app/Config';
import { DateUtils } from '../common/DateUtils';
import { RouterStore } from '../app/RouterStore';
import { RankingStore } from './RankingStore';
import { RankingSection } from './RankingSection';
import { RankingDatePickerSection } from './RankingDatePickerSection';

interface RankingPageProps {
  routerStore?: RouterStore;
  rankingStore?: RankingStore;
  params: string[];
}

@inject('routerStore', 'rankingStore')
export class RankingPage extends React.Component<RankingPageProps, {}> {

  @action
  componentWillMount() {
    const rankingStore = this.props.rankingStore;

    const date = this.props.params['date'];

    if (!date) {
      rankingStore.loadRanking();
    } else {
      // TODO: Better regex, better date validation across the whole app in general
      const dateRegex = /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/;

      if (dateRegex.exec(date)) {
        rankingStore.selectedDate = DateUtils.parse(date);
      } else {
        rankingStore.loadRanking();
        this.props.routerStore.push(paths.ranking)
      }
    }
  }
  
  render() {
    return (
      <div className="page page--ranking">
        <RankingDatePickerSection />
        <RankingSection />
      </div>
    );
  }

}