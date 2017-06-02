// tslint:disable:object-literal-sort-keys no-string-literal
import * as React from "react";

import { _b } from "common/BemHelper";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import { TeamRecord } from "team/components/TeamRecord";
import { ITeamRecord, TeamRecordTypeName } from "team/Team";

interface ITeamRecordsProps {
  readonly records: Map<TeamRecordTypeName, ITeamRecord>;
}

const b = _b("team-stats");

@observer
export class TeamRecords extends React.Component<ITeamRecordsProps, void> {

  @observable
  private detailModalsOpenState: boolean[] = [false, false, false, false];

  public render() {
    const records = this.props.records;

    return (
      <table className={b("records")}>
        <thead>
          <tr>
            <th />
            <th>Rank</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Highest</td>
            {this.renderTeamRecord(0, records.get("HighestRank"))}
            {this.renderTeamRecord(1, records.get("HighestRating"))}
          </tr>
          <tr>
            <td>Lowest</td>
            {this.renderTeamRecord(2, records.get("LowestRank"))}
            {this.renderTeamRecord(3, records.get("LowestRating"))}
          </tr>
        </tbody>
      </table>
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
