import { MoneyTransfer, User } from "../../redux/user/interface";

export interface ChartComponentOwnProps {
    children?: React.ReactNode;
    transfers: MoneyTransfer[];
    userData: User | undefined;
}

export interface ChartComponentStateProps {

}

export interface ChartComponentDispatchProps {

}

export type ChartComponentProps = ChartComponentOwnProps & ChartComponentStateProps & ChartComponentDispatchProps;