// tslint:disable:object-literal-sort-keys
import * as React from "react";

import { _b } from "common/BemHelper";
import { action, observable } from "mobx";
import { observer } from "mobx-react";
import { TeamRecord } from "team/components/TeamRecord";
import { ITeamRecord, TeamRecords as Records } from "team/Team";

interface ITeamRecordsProps {
  readonly records: Records;
}

const b = _b("team-stats");

@observer
export class TeamRecords extends React.Component<ITeamRecordsProps, void> {

  @observable
  private detailModalsState: boolean[] = [false, false, false, false];

  public render() {
    const records = this.props.records;

    return (
      <table className={b("records")}>
        <thead>
          <tr>
            <th />
            <th>Highest</th>
            <th>Lowest</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Rank</td>
            <TeamRecord
              idx={0}
              record={records.HighestRank}
              isDetailsModalOpen={this.detailModalsState[0]}
              onDetailsModalOpenRequest={this.handleDetailsModalOpenRequest}
              onDetailsModalCloseRequest={this.handleDetailsModalCloseRequest}
            />
            <TeamRecord
              idx={1}
              record={records.LowestRank}
              isDetailsModalOpen={this.detailModalsState[1]}
              onDetailsModalOpenRequest={this.handleDetailsModalOpenRequest}
              onDetailsModalCloseRequest={this.handleDetailsModalCloseRequest}
            />
          </tr>
          <tr>
            <td>Rating</td>
            <TeamRecord
              idx={2}
              record={records.HighestRating}
              isDetailsModalOpen={this.detailModalsState[2]}
              onDetailsModalOpenRequest={this.handleDetailsModalOpenRequest}
              onDetailsModalCloseRequest={this.handleDetailsModalCloseRequest}
            />
            <TeamRecord
              idx={3}
              record={records.LowestRating}
              isDetailsModalOpen={this.detailModalsState[3]}
              onDetailsModalOpenRequest={this.handleDetailsModalOpenRequest}
              onDetailsModalCloseRequest={this.handleDetailsModalCloseRequest}
            />
          </tr>
        </tbody>
      </table>
    );
  }

  private handleDetailsModalOpenRequest = (idx: number) => action(() => {
    this.detailModalsState[idx] = true;
  })

  @action.bound
  private handleDetailsModalCloseRequest() {
   this.detailModalsState.map((e, i) => this.detailModalsState[i] = false);
  }

}
