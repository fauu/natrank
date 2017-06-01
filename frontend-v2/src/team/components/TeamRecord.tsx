import * as React from "react";
import * as Modal from "react-modal";

import { stringifyDate } from "common/DateUtils";
import { TimePeriod } from "common/TimePeriod";
import { ITeamRecord } from "team/Team";

interface ITeamRecordProps {
  readonly idx: number;
  readonly record: ITeamRecord;
  readonly isDetailsModalOpen: boolean;
  onDetailsModalOpenRequest: (idx: number) => () => void;
  onDetailsModalCloseRequest: () => void;
}

export function TeamRecord(props: ITeamRecordProps) {
  const record = props.record;

  return (
    <td>
      <a role="button" onClick={props.onDetailsModalOpenRequest(props.idx)}>{record.value}</a>
      <Modal
        isOpen={props.isDetailsModalOpen}
        contentLabel="Team highest rank records details"
        onRequestClose={props.onDetailsModalCloseRequest}
      >
        <div>{record.type.friendlyName} of {record.value} held for {record.numDaysHeld} days:</div>
        <ul>
          {record.periods.map((p) => <li><RankingTimePeriod period={p} /></li>)}
        </ul>
      </Modal>
    </td>
  );
}

interface ITimePeriodProps {
  readonly period: TimePeriod;
}
function RankingTimePeriod({ period }: ITimePeriodProps) {
  const startLabel = stringifyDate(period.start, false, true);
  const startRankingPath = stringifyDate(period.start, false, false);

  const endLabel = period.end ? stringifyDate(period.end, false, true) : "now";
  const endRankingPath = period.end ? stringifyDate(period.end, false, false) : "";

  return (
    <span>
      <a href={`/ranking/${startRankingPath}`}>{startLabel}</a>
      -
      <a href={`/ranking/${endRankingPath}`}>{endLabel}</a>
    </span>
  );
}
