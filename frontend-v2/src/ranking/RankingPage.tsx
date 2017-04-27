import { action } from 'mobx';
import { inject, observer } from 'mobx-react';
import * as React from 'react';
import { RankingStore } from './RankingStore';
import { RankingSection } from './RankingSection';
import { RankingDatePickerSection } from './RankingDatePickerSection';

export class RankingPage extends React.Component<any, any> {
  
  render() {
    return (
      <div className="ranking-page">
        <RankingDatePickerSection />
        <RankingSection />
      </div>
    );
  }

}