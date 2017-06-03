import * as React from "react";
import * as ReactHighcharts from "react-highcharts";

import { TeamRecords } from "team/components/TeamRecords";
import { ITeamRecord, TeamRankingHistoryEntry, TeamRecordTypeName } from "team/Team";
import { _b } from "utils/BemHelper";

interface ITeamRankingHistoryProps {
  readonly rankHistory: TeamRankingHistoryEntry[];
  readonly records: Map<TeamRecordTypeName, ITeamRecord>;
  readonly ratingHistory?: TeamRankingHistoryEntry[];
}

const b = _b("team-ranking-history");

export function TeamRankingHistory({ rankHistory, records }: ITeamRankingHistoryProps): JSX.Element {
  const chartOptions: Highcharts.Options = {
    title: null,
    colors: ["#C33F80"],
    credits: {
      enabled: false,
    },
    chart: {
      spacingLeft: -5,
      spacingRight: -5,
      style: {
        fontFamily: "Lato",
        fontSize: "15px",
      },
      zoomType: "x",
      backgroundColor: "transparent",
    },
    tooltip: {
      xDateFormat: "%m/%d/%Y",
      backgroundColor: "rgba(0, 0, 0, 0.85)",
      borderWidth: 0,
      borderRadius: 2,
      shadow: false,
      style: {
        color: "#FCFCFC",
      },
    },
    legend: {
      enabled: false,
    },
    xAxis: {
      title: {
        text: "Year",
      },
      type: "datetime",
      labels: {
        y: 24,
      },
    },
    yAxis: [
      {
        title: {
          text: "Rank",
        },
        labels: {
          x: -6,
          y: 4,
        },
        alternateGridColor: "#FDFDFD",
        reversed: true,
        allowDecimals: false,
      },
    ],
    series: [
      {
        yAxis: 0,
        name: "Rank",
        type: "line",
        zIndex: 2,
        data: rankHistory,
      },
    ],
  };

  return (
    <div className={b}>
      <div className={b("header")}>
        Ranking history
      </div>

      <div className={b("section")}>
        <ReactHighcharts config={chartOptions} isPureConfig={true} />
      </div>

      <div className={b("section")}>
        <TeamRecords records={records} />
      </div>
    </div>
  );
}
