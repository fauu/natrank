import * as React from "react";
import * as ReactHighcharts from "react-highcharts";

import { _b } from "common/BemHelper";
import { TeamRankingHistoryEntry } from "team/Team";

interface ITeamRankingHistoryProps {
  readonly rankHistory: TeamRankingHistoryEntry[];
  readonly ratingHistory?: TeamRankingHistoryEntry[];
}

const b = _b("team-ranking-history");

export function TeamRankingHistory({ rankHistory }: ITeamRankingHistoryProps): JSX.Element {
  const chartOptions: Highcharts.Options = {
    title: null,
    colors: ["#C33F80"],
    credits: {
      enabled: false,
    },
    chart: {
      // spacingBottom: 10,
      // spacingLeft: 27,
      // spacingRight: 37,
      style: {
        fontFamily: "Lato",
        fontSize: "15px",
      },
      zoomType: "x",
      backgroundColor: "transparent",
    },
    tooltip: {
      xDateFormat: "%m/%d/%Y",
      backgroundColor: "rgba(0, 0, 0, 0.87)",
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
        format: "{value: %Y}",
        y: 22
      }
    },
    yAxis: [
      {
        title: {
          text: "Rank",
        },
        labels: {
          x: -4,
          y: 4
        },
        alternateGridColor: "#FDFDFD",
        reversed: true,
      }
    ],
    series: [
      {
        yAxis: 0,
        name: "Rank",
        type: "line",
        zIndex: 2,
        // step: true,
        data: rankHistory
      }
    ]
  };

  return (
    <div className={b}>
      <div className={b("header")}>
        Ranking history
      </div>

      <ReactHighcharts config={chartOptions} isPureConfig={true} />
    </div>
  );
}
