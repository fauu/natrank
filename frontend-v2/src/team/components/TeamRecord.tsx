import * as React from "react";
import * as Modal from "react-modal";

import { _b } from "common/BemHelper";
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

const b = _b("team-record-details-modal");

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
        <div className="modal-header">
          Team record details
        </div>
        <div className={b("intro")}>
          {record.type.friendlyName} of <span className={b("value")}>{record.value} </span>
          held for
          <span className={b("length")}> {record.numDaysHeld} </span> days:
        </div>
        <ul className={b("period-list")}>
          {record.periods.map((p, idx) => <li key={idx}><RankingTimePeriod period={p} /></li>)}
        </ul>
        <div className="modal-close-instruction">(click outside to dismiss)</div>
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
      <a href={`/ranking/${startRankingPath}`}>{startLabel} </a>
      –
      <a href={`/ranking/${endRankingPath}`}> {endLabel}</a>
    </span>
  );
}
