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
            <th>Highest</th>
            <th>Lowest</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Rank</td>
            <TeamRecord
              idx={0}
              record={records["HighestRank"]}
              isDetailsModalOpen={this.detailModalsOpenState[0]}
              onDetailsModalOpenRequest={this.handleDetailsModalOpenRequest}
              onDetailsModalCloseRequest={this.handleDetailsModalCloseRequest}
            />
            <TeamRecord
              idx={1}
              record={records["LowestRank"]}
              isDetailsModalOpen={this.detailModalsOpenState[1]}
              onDetailsModalOpenRequest={this.handleDetailsModalOpenRequest}
              onDetailsModalCloseRequest={this.handleDetailsModalCloseRequest}
            />
          </tr>
          <tr>
            <td>Rating</td>
            <TeamRecord
              idx={2}
              record={records["HighestRating"]}
              isDetailsModalOpen={this.detailModalsOpenState[2]}
              onDetailsModalOpenRequest={this.handleDetailsModalOpenRequest}
              onDetailsModalCloseRequest={this.handleDetailsModalCloseRequest}
            />
            <TeamRecord
              idx={3}
              record={records["LowestRating"]}
              isDetailsModalOpen={this.detailModalsOpenState[3]}
              onDetailsModalOpenRequest={this.handleDetailsModalOpenRequest}
              onDetailsModalCloseRequest={this.handleDetailsModalCloseRequest}
            />
          </tr>
        </tbody>
      </table>
    );
  }

  private handleDetailsModalOpenRequest = (idx: number) => action(() => {
    this.detailModalsOpenState[idx] = true;
  })

  @action.bound
  private handleDetailsModalCloseRequest() {
   this.detailModalsOpenState.map((e, i) => this.detailModalsOpenState[i] = false);
  }

}
