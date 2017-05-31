import * as React from "react";
import * as Modal from "react-modal";

import { ITeamRecord } from "team/Team";

interface ITeamRecordProps {
  readonly idx: number;
  readonly record: ITeamRecord;
  readonly isDetailsModalOpen: boolean;
  onDetailsModalOpenRequest: (idx: number) => () => void;
  onDetailsModalCloseRequest: () => void;
}

export function TeamRecord(props: ITeamRecordProps) {
  return (
    <td>
      <a role="button" onClick={props.onDetailsModalOpenRequest(props.idx)}>{props.record.value}</a>
      <Modal
        isOpen={props.isDetailsModalOpen}
        contentLabel="Team highest rank records details"
        onRequestClose={props.onDetailsModalCloseRequest}
      >
        <div>Record high rank of {props.record.value} held for {props.record.numDaysHeld} days:</div>
        <ul>
          <li>(period)</li>
        </ul>
      </Modal>
    </td>
  );
}
