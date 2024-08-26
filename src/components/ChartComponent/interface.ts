import { MoneyTransfer } from "../../redux/user/interface";

export interface ChartComponentOwnProps {
    children?: React.ReactNode;
    transfers: MoneyTransfer[];
}

export interface ChartComponentStateProps {

}

export interface ChartComponentDispatchProps {

}

export type ChartComponentProps = ChartComponentOwnProps & ChartComponentStateProps & ChartComponentDispatchProps;