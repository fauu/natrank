import * as React from "react";

import { _b } from "common/BemHelper";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import { TeamRecord } from "team/components/TeamRecord";
import { ITeamRecord, TeamRecordTypeName } from "team/Team";

interface ITeamRecordsProps {
  readonly records: Map<TeamRecordTypeName, ITeamRecord>;
}

const b = _b("team-records");

@observer
export class TeamRecords extends React.Component<ITeamRecordsProps, void> {

  @observable
  private detailModalsOpenState: boolean[] = [false, false, false, false];

  public render() {
    const records = this.props.records;

    return (
      <div className={b}>
        <div className={b("row")}>
          <div className={b("criterion-label")}>Rank</div>
          <div className={b("criterion-label")}>Rating</div>
        </div>
        <div className={b("row")}>
          <div className={b("criterion")}>
            {this.renderTeamRecord(0, records.get("HighestRank"))}
            {this.renderTeamRecord(1, records.get("LowestRank"))}
          </div>
          <div className={b("criterion")}>
            {this.renderTeamRecord(2, records.get("HighestRating"))}
            {this.renderTeamRecord(3, records.get("LowestRating"))}
          </div>
        </div>
      </div>
    );
  }

  private renderTeamRecord = (idx: number, record: ITeamRecord): JSX.Element => (
    <TeamRecord
      idx={idx}
      record={record}
      isDetailsModalOpen={this.detailModalsOpenState[idx]}
      onDetailsModalOpenRequest={this.handleDetailsModalOpenRequest}
      onDetailsModalCloseRequest={this.handleDetailsModalCloseRequest}
    />
  )

  private handleDetailsModalOpenRequest = (idx: number) => action(() => {
    this.detailModalsOpenState[idx] = true;
  })

  @action.bound
  private handleDetailsModalCloseRequest() {
    this.detailModalsOpenState.map((e, i) => this.detailModalsOpenState[i] = false);
  }

}
