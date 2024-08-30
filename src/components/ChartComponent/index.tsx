import React from 'react';
import { ChartComponentProps } from './interface';
import { ChartData } from "chart.js";
import LineChart from  '../LineChart';
import './style.scss';

const ChartComponent : React.FC<ChartComponentProps> = ({ transfers, userData }) => {
    const chartData: ChartData<'line'> = {
        labels: transfers.map((transfer) => transfer.createdAtFormatted), 
        datasets: [
        {
            label: "Balance Changes Over Time ",
            data: transfers.map((transfer) => transfer.debitAccount.balance),
            backgroundColor: [
                "rgba(75,192,192,1)",
                "#ff4739",
                "#50AF95",
                "#f3ba2f",
                "#2a71d0"
            ],
            borderColor: "black",
            borderWidth: 1,
        }
      ]
    };
   
    return (
        <div className="chart-component">
            <div className="pt-3 pb-3 border-bottom">
                <h1 className="h2 text-success">
                    {
                        userData && userData.givenName ?
                            `Welcome back, ${userData.givenName}!`
                        :
                            'Welcome back!'
                    }
                </h1>

                <small>Check the latest updates on your account...</small>
            </div>

            <LineChart chartData={chartData} />
        </div>
    );
};
  
export default (ChartComponent);
