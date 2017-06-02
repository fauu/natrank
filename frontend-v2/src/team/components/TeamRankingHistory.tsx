import * as React from "react";
import * as ReactHighcharts from "react-highcharts";

import { TeamRankingHistoryEntry } from "team/Team";

interface ITeamRankingHistoryProps {
  readonly rankHistory: TeamRankingHistoryEntry[];
  readonly ratingHistory: TeamRankingHistoryEntry[];
}

export function TeamRankingHistory({ rankHistory, ratingHistory }: ITeamRankingHistoryProps): JSX.Element {
  const chartOptions: Highcharts.Options = {
    title: null,
    colors: ["#1877AC", "#C33F80"],
    credits: {
      enabled: false,
    },
    chart: {
      spacingBottom: 10,
      spacingLeft: 27,
      spacingRight: 37,
      style: {
        fontFamily: "Lato",
        fontSize: "12px",
      },
      zoomType: "x",
      backgroundColor: "transparent",
    },
    tooltip: {
      xDateFormat: "%m/%d/%Y",
      useHTML: true,
      backgroundColor: "rgba(0, 0, 0, 0.87)",
      borderWidth: 0,
      borderRadius: 8,
      shadow: false,
      style: {
        color: "#FCFCFC",
      },
    },
    legend: {
      margin: 3
    },
    xAxis: {
      title: {
        text: "Year",
        offset: 32
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
          offset: 40
        },
        labels: {
          x: -4,
          y: 3
        },
        alternateGridColor: "#FDFDFD",
        reversed: true,
      },
      {
        title: {
          text: "Rating",
          offset: 25
        },
        labels: {
          x: 3,
          y: 3,
          formatter: function () {
            if (this.value !== 0) {
              return this.value;
            } else {
              return null;
            }
          }
        },
        opposite: true,
        allowDecimals: false,
        floor: 1
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
      },
      {
        yAxis: 1,
        name: "Rating",
        type: "spline",
        data: ratingHistory
      }
    ]
  };

  return (
    <ReactHighcharts config={chartOptions} isPureConfig={true} />
  );
}
