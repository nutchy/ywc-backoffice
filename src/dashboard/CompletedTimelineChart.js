import React, {Component} from "react";
import Chart from "react-apexcharts";
import {PropTypes} from "prop-types";

class CompletedTimelineChart extends Component {
  label = user => {
    const {month, day, year} = user._id;
    return `${day}/${month}/${year}`;
  };

  series = users => {
    return [
      {
        data: users.filter(x => x._id.month !== null).map(user => ({
          x: this.label(user),
          y: user.count,
        })),
      },
    ];
  };

  renderCompletedTimeline = users => {
    return {
      chart: {
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      series: this.series(users),
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"],
          opacity: 0.5,
        },
      },
      labels: users.map(this.label),
      xaxis: {
        categories: users.map(this.label),
      },
    };
  };

  render() {
    const {dataframe} = this.props;
    const completedTimeline = this.renderCompletedTimeline(dataframe);
    const series = this.series(dataframe);

    console.log(series, completedTimeline);

    return (
      <Chart
        options={completedTimeline}
        series={series}
        type="line"
        width="100%"
        height={500}
      />
    );
  }
}

CompletedTimelineChart.propTypes = {
  dataframe: PropTypes.array.isRequired,
};

export default CompletedTimelineChart;
