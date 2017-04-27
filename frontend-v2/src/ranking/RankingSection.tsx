import { inject, observer } from 'mobx-react';
import * as React from 'react';
import * as Spinner from 'react-spinner';
import { RankingStore } from './RankingStore';
import { RankingTable } from './RankingTable';

interface RankingSectionProps {
  rankingStore?: RankingStore
}

@inject('rankingStore')
@observer
export class RankingSection extends React.Component<RankingSectionProps, any> {

  render() {
    return ( 
      this.props.rankingStore.ranking 
      ? <RankingTable ranking={this.props.rankingStore.ranking} />
      : <Spinner />
    )
  }

}