import { ChartData } from 'chart.js';

export interface LineChartOwnProps {
    children?: React.ReactNode;
    chartData: ChartData<'line'>;
}

export interface LineChartStateProps {

}

export interface LineChartDispatchProps {

}

export type LineChartProps = LineChartOwnProps & LineChartStateProps & LineChartDispatchProps;