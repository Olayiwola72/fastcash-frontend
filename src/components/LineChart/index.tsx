import React from 'react';
import { LineChartProps } from './interface';
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Line } from "react-chartjs-2";
import './style.scss';

Chart.register(CategoryScale);

const LineChart : React.FC<LineChartProps> = ({ chartData }) => {
    return (
        <div className="chart-container">
          <Line
            data={chartData}
            options={{
                plugins: {
                    title: {
                        display: true,
                        text: "Balance After Transaction"
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        stacked: true
                    },
                },
            }}
          />
        </div>
    );
};
  
export default (LineChart);
