import React, { Component } from "react";
import Chart from "react-apexcharts";

type Props = {
  chartData: any;
};

class AdminChart extends Component<Props> {
  render() {
    const { users, drivers } = this.props.chartData;

    const state = {
      options: {
        chart: {
          id: "Admin Chart",
        },
        xaxis: {
          categories: ["Total Teachers", "Student"],
        },
      },
      series: [
        {
          name: "Value",
          data: [users, drivers],
        },
      ],
    };

    return (
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={state.options}
              series={state.series}
              type="area"
              width="900"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default AdminChart;
