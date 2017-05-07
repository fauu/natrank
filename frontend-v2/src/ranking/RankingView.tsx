import { action } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { paths } from '../app/Config';
import { DateUtils } from '../common/DateUtils';
import { RouterStore } from '../app/RouterStore';
import { RankingStore } from './RankingStore';
import { RankingSection } from './RankingSection';
import { RankingDatePickerSection } from './RankingDatePickerSection';

interface RankingViewProps {
  routerStore: RouterStore;
  rankingStore: RankingStore;
  params: string[];
}

@inject('routerStore', 'rankingStore')
@observer
export class RankingView extends React.Component<RankingViewProps, {}> {

  rankingStore: RankingStore;
  routerStore: RouterStore;

  componentWillMount() {
    this.rankingStore = this.props.rankingStore;
    this.routerStore = this.props.routerStore;
  }

  componentDidMount() {
    const pathDate = this.props.params['date'];

    if (!pathDate) {
      this.rankingStore.loadRanking();
    } else {
      // TODO: Better regex, better date validation across the whole app in general
      const dateRegex = /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/;

      if (dateRegex.exec(pathDate)) {
        this.handleDateChange(DateUtils.parse(pathDate));
      } else {
        this.rankingStore.loadRanking();
        this.routerStore.push(paths.ranking)
      }
    }
  }

  handleDateChange = action((newValue: Date) => {
    this.rankingStore.loadRanking(newValue);
    this.routerStore.push(`${paths.ranking}/${DateUtils.stringify(newValue)}`);
  })

  render() {
    return (
      <div className="page page--ranking">
        <RankingDatePickerSection
          initialDate={this.rankingStore.initialDate}
          onDateChange={this.handleDateChange} />
        <RankingSection />
      </div>
    );
  }

}